import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, VStack } from "@chakra-ui/react";
import { setDarkMode } from '../reducers/app';

const ThemeSwitch = () => {
  const isDarkMode = useSelector((state) => state.app.isDarkMode);
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    dispatch(setDarkMode(!isDarkMode));
  };

  return (
    <VStack>
      <p>Dark theme</p>
      <Switch
        colorScheme="teal"
        size="lg"
        isChecked={isDarkMode}
        onChange={handleThemeChange}
      />
    </VStack>
  );
};

export default ThemeSwitch;
