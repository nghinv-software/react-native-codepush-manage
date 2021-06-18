/**
 * Created by nghinv on Tue Jun 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import CodePushProvider from './CodePushProvider';
import { withCodePush } from './withCodePush';
import { useCodePush } from './useCodePush';

module.exports = {
  CodePushProvider,
  withCodePush,
  useCodePush,
  get AppVersion() {
    return require('./AppVersion').default;
  },
};
