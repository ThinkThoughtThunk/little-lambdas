import SumType from 'sums-up';

class RequestState<T = never> extends SumType<{
  NotStarted: [];
  Connecting: [];
  Downloading: [number];
  Completed: [T];
  Failed: [string];
}> {}

const state = new RequestState('Failed', 'Connection reset.');
const progressPercentage = state.caseOf({
  Downloading: pct => pct,
  Completed: () => 100,
  _: () => 0
});
