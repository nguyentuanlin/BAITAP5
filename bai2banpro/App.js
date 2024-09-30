import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [longPressedKey, setLongPressedKey] = useState(null);

  const handleInput = (value) => {
    const formattedValue = value.replace(/[^0-9]/g, '');
    if (formattedValue.length <= 10) {
      setPhoneNumber(formatPhoneNumber(formattedValue));
    }
  };

  const formatPhoneNumber = (value) => {
    // Định dạng số điện thoại theo mẫu xxx-xxx-xxxx
    const phoneNumberPattern = /^(\d{3})(\d{3})(\d{4})$/;
    const matches = value.match(phoneNumberPattern);
    if (matches) {
      return `${matches[1]}-${matches[2]}-${matches[3]}`;
    }
    return value;
  };

  const clearInput = () => {
    setPhoneNumber('');
  };

  const handleLongPress = (letters) => {
    setLongPressedKey(letters);
  };

  const handleSelectLetter = (letter) => {
    setPhoneNumber(phoneNumber + letter);
    setLongPressedKey(null);
  };

  const handleContinue = () => {
    // Kiểm tra tính hợp lệ của số điện thoại
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ. Vui lòng nhập lại.', [
        { text: 'OK' },
      ]);
    } else {
      Alert.alert('Đăng Nhập Thành Công', 'Bạn đã đăng nhập thành công với số điện thoại ' + phoneNumber, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const validatePhoneNumber = (number) => {
    // Kiểm tra số điện thoại có định dạng xxx-xxx-xxxx
    const phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;
    return phoneNumberPattern.test(number);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.statusBar}>
          <Icon name="wifi" size={18} color="#fff" style={styles.statusIcon} />
          <Feather name="bluetooth" size={18} color="#fff" style={styles.statusIcon} />
          <Icon name="signal" size={18} color="#fff" style={styles.statusIcon} />
          <MaterialIcons name="battery-full" size={18} color="#fff" style={styles.statusIcon} />
        </View>

        <View style={styles.iconRow}>
          <Icon name="phone" size={24} color="#007BFF" style={styles.inputIcon} />
          <Text style={styles.title}>Đăng Nhập</Text>
        </View>

        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>

        <View style={styles.inputContainer}>
          <MaterialIcons name="phone" size={24} color="#333" style={styles.inputIcon} />
          <TextInput
            style={styles.phoneNumberInput}
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChangeText={handleInput}
            keyboardType="phone-pad"
          />
        </View>

        {longPressedKey && (
          <View style={styles.longPressContainer}>
            {longPressedKey.split('').map((letter, index) => (
              <TouchableOpacity key={index} style={styles.letterButton} onPress={() => handleSelectLetter(letter)}>
                <Text style={styles.longPressText}>{letter}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue} activeOpacity={0.8}>
          <Text style={styles.continueButtonText}>Tiếp Tục</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Đảm bảo các icon cách đều nhau
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#333',
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  statusIcon: {
    marginHorizontal: 4, // Giảm khoảng cách giữa các icon
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    color: '#333',
    marginLeft: 5, // Giảm khoảng cách giữa icon và tiêu đề
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputIcon: {
    padding: 5,
  },
  phoneNumberInput: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    flex: 1,
    textAlign: 'center',
  },
  longPressContainer: {
    position: 'absolute',
    top: 150,
    left: '50%',
    transform: [{ translateX: -75 }],
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 200,
    alignItems: 'center',
  },
  letterButton: {
    padding: 5,
    margin: 2,
    borderRadius: 5,
    backgroundColor: '#444',
  },
  longPressText: {
    color: '#fff',
    fontSize: 16,
  },
  continueButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
