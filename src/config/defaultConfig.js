import { selectors } from '../utils/selectors';
import { BlockRule } from '../models/BlockRule';

export const defaultConfig = {
    blockRules: [
        new BlockRule(selectors.premiumSignup, 'Premium Signup'),
        new BlockRule(selectors.verifiedOrgsSignup, 'Verified Orgs Signup')
    ]
};