import { all, SagaGenerator } from 'typed-redux-saga';

import { watchUser } from '~/modules/user/sagas';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* rootSaga(): SagaGenerator<any> {
  yield* all([watchUser()]);
}
