// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   Alert,
// } from "react-native";

// const AccountCreationScreen = () => {
//   // State for form fields
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   // Validation states
//   const [errors, setErrors] = useState({});

//   // Validate form fields
//   const validateForm = () => {
//     const newErrors = {};

//     // Full Name validation
//     if (!fullName.trim()) {
//       newErrors.fullName = "Full name is required";
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!emailRegex.test(email)) {
//       newErrors.email = "Invalid email format";
//     }

//     // Phone Number validation
//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneNumber.trim()) {
//       newErrors.phoneNumber = "Phone number is required";
//     } else if (!phoneRegex.test(phoneNumber)) {
//       newErrors.phoneNumber = "Invalid phone number (10 digits)";
//     }

//     // Password validation
//     if (!password.trim()) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     }

//     // Confirm Password validation
//     if (password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle account creation
//   const handleCreateAccount = () => {
//     if (validateForm()) {
//       // TODO: Implement actual account creation logic
//       // This might involve calling an API, storing user data, etc.
//       Alert.alert(
//         "Account Created",
//         "Your account has been successfully created!",
//         [{ text: "OK", onPress: () => navigation.navigate("Home") }]
//       );
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>Create Your Account</Text>

//         {/* Full Name Input */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Full Name</Text>
//           <TextInput
//             style={[styles.input, errors.fullName && styles.errorInput]}
//             value={fullName}
//             onChangeText={setFullName}
//             placeholder="Enter your full name"
//           />
//           {errors.fullName && (
//             <Text style={styles.errorText}>{errors.fullName}</Text>
//           )}
//         </View>

//         {/* Email Input */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={[styles.input, errors.email && styles.errorInput]}
//             value={email}
//             onChangeText={setEmail}
//             placeholder="Enter your email"
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//           {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
//         </View>

//         {/* Phone Number Input */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Phone Number</Text>
//           <TextInput
//             style={[styles.input, errors.phoneNumber && styles.errorInput]}
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//             placeholder="Enter your phone number"
//             keyboardType="phone-pad"
//             maxLength={10}
//           />
//           {errors.phoneNumber && (
//             <Text style={styles.errorText}>{errors.phoneNumber}</Text>
//           )}
//         </View>

//         {/* Password Input */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Password</Text>
//           <TextInput
//             style={[styles.input, errors.password && styles.errorInput]}
//             value={password}
//             onChangeText={setPassword}
//             placeholder="Create a password"
//             secureTextEntry
//           />
//           {errors.password && (
//             <Text style={styles.errorText}>{errors.password}</Text>
//           )}
//         </View>

//         {/* Confirm Password Input */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Confirm Password</Text>
//           <TextInput
//             style={[styles.input, errors.confirmPassword && styles.errorInput]}
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             placeholder="Confirm your password"
//             secureTextEntry
//           />
//           {errors.confirmPassword && (
//             <Text style={styles.errorText}>{errors.confirmPassword}</Text>
//           )}
//         </View>

//         {/* Create Account Button */}
//         <TouchableOpacity
//           style={styles.createButton}
//           onPress={handleCreateAccount}
//         >
//           <Text style={styles.createButtonText}>Create Account</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "red",
//   },
//   scrollContainer: {
//     padding: 20,
//     paddingTop: 40,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#333",
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     marginBottom: 5,
//     color: "#666",
//   },
//   input: {
//     backgroundColor: "white",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//   },
//   errorInput: {
//     borderColor: "red",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 12,
//     marginTop: 5,
//   },
//   createButton: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   createButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default AccountCreationScreen;
