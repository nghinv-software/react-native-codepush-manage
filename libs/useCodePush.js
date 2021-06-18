/**
 * Created by nghinv on Tue Jun 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { useContext } from 'react';
import { CodePushContext } from './CodePushContext';

export const useCodePush = () => useContext(CodePushContext);
