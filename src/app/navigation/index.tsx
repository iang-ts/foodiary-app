import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthStack } from './AuthStack';


export function Navigation() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
