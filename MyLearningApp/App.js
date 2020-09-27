import React, { useState } from "react";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import logger from "./app/utility/logger";

logger.start();

export default function App() {
  logger.log(new Error("Error in app"));

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// import React from "react";
// import { Button } from "react-native";
// import { Notifications } from "expo";

// import Screen from "./app/components/Screen";

// export default function App() {
//   const showNotification = () => {
//     Notifications.presentLocalNotificationAsync({
//       title: "Congratulations",
//       body: "Your Order was successfully placed...",
//     });
//     // Notifications.scheduleLocalNotificationAsync(
//     //   {
//     //     title: "Congratulations",
//     //     body: "Your Order was successfully placed...",
//     //   },
//     //   {
//     //     time: new Date().getTime() + 5000,
//     //   }
//     // );
//   };

//   return (
//     <Screen>
//       <Button title="Tap me" onPress={showNotification} />
//     </Screen>
//   );
// }
