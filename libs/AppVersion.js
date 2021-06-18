/**
 * Created by nghinv on Fri Jun 18 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import equals from 'react-fast-compare';
import CodePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import { useCodePush } from './useCodePush';

type StatusTitle = {
  Updating: String;
  Installing: String;
  NeedToRestart: String;
}

interface AppVersionProps {
  title?: String;
  statusTitle?: StatusTitle;
  style?: ViewStyle;
  titleColor?: String;
  titleStyle?: TextStyle;
  onPress?: () => void;
  restartOnPress?: Boolean;
  buildDate?: String;
}

AppVersion.defaultProps = {
  restartOnPress: true,
  statusTitle: {
    Updating: 'Updating',
    Installing: 'Installing',
    NeedToRestart: 'Need to restart',
  },
};

function AppVersion(props: AppVersionProps) {
  const { title, statusTitle, style, titleColor, titleStyle, onPress, restartOnPress, buildDate } = props;
  const { status, progress } = useCodePush();
  const version = DeviceInfo.getVersion();

  let titleVersion = title || `V${version}${buildDate ? ` - ${buildDate}` : ''}`;
  switch (status) {
    case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
      break;
    case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
      titleVersion = `${statusTitle.Updating}: ${progress}%`;
      break;
    case CodePush.SyncStatus.INSTALLING_UPDATE:
      titleVersion = `${statusTitle.Installing}...`;
      break;
    case CodePush.SyncStatus.UP_TO_DATE:
      break;
    case CodePush.SyncStatus.UPDATE_INSTALLED:
      titleVersion = statusTitle.NeedToRestart;
      break;
    default:
      break;
  }

  const onReStartApp = () => {
    onPress && onPress();
    restartOnPress && CodePush.restartApp();
  };

  const ButtonComponent = status === CodePush.SyncStatus.UPDATE_INSTALLED ? TouchableOpacity : View;

  return (
    <ButtonComponent onPress={onReStartApp} style={[styles.container, style]}>
      <Text style={[styles.txtTitle, { color: titleColor }, titleStyle]}>{titleVersion}</Text>
    </ButtonComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  txtTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default React.memo(AppVersion, equals);
