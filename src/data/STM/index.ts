/**
 * Software Transactional Memory
 * @packageDocumentation
 * @module STM
 * https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/beautiful.pdf
 */

/* ------------------------ Bank Accounts Using Locks ----------------------- */

type UnlockFn = () => void

class Mutex {
  mutex: Promise<void>

  constructor() {
    this.mutex = Promise.resolve()
  }

  lock(): Promise<UnlockFn> {
    let begin: (unlock: UnlockFn) => void = () => {}

    this.mutex = this.mutex.then(() => new Promise(begin))

    return new Promise(res => (begin = res))
  }

  dispatch<T>(fn: (() => T) | (() => Promise<T>)): Promise<T> {
    return this.lock().then(unlock => Promise.resolve(fn()).finally(unlock))
  }
}

class Account2 {
  balance: number
  state: Promise<'Locked'> | 'Unlocked'

  constructor(balance: number) {
    this.balance = balance
    this.state = 'Unlocked'
  }

  lock(): Promise<this> {
    this.state = new Promise((res, rej) => {})
    return new Promise(res => res(this))
  }

  unlock(): this {
    this.state = 'Unlocked'
    return this
  }

  withdraw(amount: number): Promise<this> {
    this.lock()
    const action = () => ((this.balance = this.balance - amount), void 0)

    return new Promise(res => {
      if (this.state instanceof Promise) {
        this.state.finally(action)
        this.state = 'Unlocked'
        return res(this)
      }
      action()
      res(this.unlock())
    })
  }

  deposit(amount: number): Promise<this> {
    return this.withdraw(-amount)
  }
}

function transfer1(from: Account, to: Account, amount: number): Promise<void> {
  from.withdraw(amount).then(_ => to.deposit(amount))
}

function transfer2(from: Account, to: Account, amount: number): Promise<void> {
  Promise.all([from.lock(), to.lock()])
    .then(() => from.withdraw(amount))
    .then(() => to.deposit(amount))
    .then(() => Promise.all([from.unlock(), to.unlock()]))
}

/* ---------------------- Software Transactional Memory --------------------- */

type Transfer = (_: Account) => (_: Account) => (_: number) => void
const transfer: Transfer = from => to => amount =>
  atomically(deposit(to)(amount), withdraw(from)(amount))


// read or write a transactional variable of type TVar a
type Atomically<a> = (_: STM<a>) => a

type Retry<a> = STM<a>;
type OrElse<a> = (_: STM<a>) => (_: STM<a>) => STM<a>
const orElse = <a>(consequent) => alternate =>

type TVar<a> = (_: a) => STM<TVar<a>>
const tvar:
type ReadTVar<a> = (_: TVar<a>) => STM<a>
type WriteTVar<a> = (_: TVar<a>) => (_: a) => STM<void>

type Account = TVar<number>()


type Withdraw = (_: Account) => (_: number) => STM<void>
const withdraw: Withdraw = acc => amount =>
  writeTVar(acc)(readTVar(acc) - amount)

type Deposit = (_: Account) => (_: number) => STM<void>
const deposit: Deposit = acc => amount => withdraw(acc)(-amount)


type Check = (_: boolean) => STM<void>;
const check: Check = (ok) => ok ? STM<void>() : retry<void>

function fork() {}


/* --------------------------- Reindeer And Elves --------------------------- */


const meetInStudy = (id: number) => console.log(`Elf ${id} meeting in the study`);


const deliverToys = (id: number) => console.log(`Reindeer ${id} delivering toys`);

type Helper1 = (_: Group) => (_: number) => void
const helper1 = group => doTask => {
  const {inGate, outGate} = joinGroup(group)
  passGate(inGate)
  doTask()
  passGate(outGate)
};


const elf1: Helper1 = (group) => (id) => helper1(group)(meetInStudy(id))
const reindeer1: Helper1 = (group) => (id) => helper1(group)(deliverToys(id))

type GateT = {t: 'Gate', capacity: number, tv: TVar<number>}
const Gate = (n): GateT => {
  return {
    t: 'Gate',
    capacity: n,
    tv: TVar(0)
  }
}

const passGate = ({capacity, tv}: GateT) => {
  return atomically(
    readTVar(tv).then(remainingCapacity => check(remainingCapacity > 0).then(writeTVar(tv)(remainingCapacity - 1)))
  );
}

const operateGate = ({capacity, tv}: GateT) => {
  atomically(writeTVar(tv)(capacity))
  atomically(readTVar(tv).then(remainingCapacity => check(remainingCapacity === 0)))
};

