import {expectType, expectError} from 'tsd';
import callerCallsite = require('.');

expectType<callerCallsite.CallSite | undefined>(callerCallsite());
expectError<callerCallsite.CallSite>(callerCallsite());
