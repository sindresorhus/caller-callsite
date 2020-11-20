import {expectType, expectError} from 'tsd';
import callerCallsite = require('.');

expectType<callerCallsite.CallSite | undefined>(callerCallsite());
expectType<callerCallsite.CallSite | undefined>(callerCallsite({depth: 1}));
expectError<callerCallsite.CallSite>(callerCallsite());
