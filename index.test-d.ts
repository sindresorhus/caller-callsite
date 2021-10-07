import {expectType, expectError} from 'tsd';
import callerCallsite, {CallSite} from './index.js';

expectType<CallSite | undefined>(callerCallsite());
expectType<CallSite | undefined>(callerCallsite({depth: 1}));
expectError<CallSite>(callerCallsite());
