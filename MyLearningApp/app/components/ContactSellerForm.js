import React from "react";
import { StyleSheet, View, Keyboard, Alert } from "react-native";
import { Notifications } from "expo";
import * as Yup from "yup";

import messagesApi from "../api/messages";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "./forms";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(10).label("Message"),
});

function ContactSellerForm({ listing }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing.id);

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert(
        "Error",
        "Could not send the message to the server..."
      );
    }

    resetForm();

    Notifications.presentLocalNotificationAsync({
      title: "Awesome",
      body: "Your message was successfully sent to the seller...",
    });
  };

  return (
    <View style={styles.container}>
      <Form
        initialValues={{
          message: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          maxLength={255}
          multiline
          name="message"
          numberOfLines={1}
          placeholder="Message..."
        />
        <SubmitButton title="Contact Seller" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ContactSellerForm;
