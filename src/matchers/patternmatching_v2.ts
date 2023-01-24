// arrayEquals: a[] -> b[] -> boolean
// Variants: Record<string, unknown[]>
// VariantNameAndData: Record<keyof Variants, Unshift Variant>[keyof Variants]
// ExhaustiveCasePattern: Record<keyof Variants, (..._: (Variant value)[])> -> Result
// CasePattern =
// | ExhaustiveCasePattern<Variants, Result>
// | Partial <ExhaustiveCasePattern<Variants, Result>> & { _: () => Result }

let ruleSimplifier = (rules) => {
  let simplifyExpression = (expression) => {
    let subexpressionsSimplified = Array.isArray(expression)
      ? expression.map(simplifyExpression)
      : expression;
    return tryRules(
      subexpressionsSimplified(
        rules,
        () => new Promise((resolve, _) => resolve(simplifyExpression)),
        () => new Promise((_, reject) => reject(subexpressionsSimplified))
      )
    );
  };
};

let tryRules = (data, rules, succeed, fail) => {
  let perRule = rules(rules);
  if (rules.length === 0) fail();
  return tryRules(data, rules[0], succeed, () => perRule(rules.slice(1)));
};

let tryRule = (data, rule, succeed, fail) => rule(data, succeed, fail);

// makeRule("(* (? b) (? a))", (b, a) => and(lt(a, b), "(* ,a ,b))))"
let or = (...bs) => bs.some(Boolean);
let and = (...bs) => bs.every(Boolean);

let makeRule = (pattern, handler) => {
  let matchProcedure = match_compilePattern(pattern);
  let theRule = (data, succeed, fail) => {
    return or(
      runMatcher(matchProcedure, data, (dict) => {
        let result = handler(...match_allValues(dict));
        return and(
          result,
          succeed(result, () => false)
        );
      }),
      fail()
    );
  };
  return theRule;
};

// (make-rule ’(* (? b) (? a))
//   (lambda (b a)
//     (and (expr<? a b)
//          ‘(* ,a ,b))))

// (define -
//     (make-pattern-operator
//      (rule ’((? x)) (n:- 0 x))
//      (rule ’((? x) (?? y)) (n:- x (apply n:+ y)))))
let makePatternOperator = (...rules) => {
  let rules = ['rules', Array.isArray(rules) ? rules.slice(-2) : []];
  let defaultRule = and(Array.isArray(rules), rules[-1]);
  let theOperator = (...data) => {
    let succeed = (value, fail) => value;
    let fail = () => {
      throw new Error('No applicable operations: ' + data);
    };

    return tryRules(
      data,
      rules.slice(1),
      succeed,
      defaultRule ? () => tryRule(data, defaultRule, succeed, fail) : fail
    );
  };
};

let attachRule = (operator, rule) => {
  let metadata = patternMetadata(operator);
  metadata[1] = metadata[1].concat(rule);
  return metadata;
};

let overrideRule = (operator, rule) => {
  let metadata = patternMetadata(operator);
  metadata[1] = [rule, metadata[1]];
  return metadata;
};

// (define (result-receiver dict n-eaten)
//   ‘(success ,(match:bindings dict) ,n-eaten))
