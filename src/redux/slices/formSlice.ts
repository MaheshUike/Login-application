
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../store'; 

// export interface FormValues {
//   name: string;
//   email: string;
//   gender: string;
//   phoneNumber: string;
//   password: string;
//   confirmPassword: string;
//   termsAndConditions: boolean;
// }

// const initialState: FormValues = {
//   name: '',
//   email: '',
//   gender: '',
//   phoneNumber: '',
//   password: '',
//   confirmPassword: '',
//   termsAndConditions: false,
// };

// export const formSlice = createSlice({
//   name: 'form', //name of slice
//   initialState, // initial state of slice
//   reducers: {
//     updateField: {
//       reducer: (state, action: PayloadAction<{ field: keyof FormValues; value: any }>) => {
//         const { field, value } = action.payload;
       
//         switch (field) {
//           case 'name':
//             state.name = value;
//             break;
//           case 'email':
//             state.email = value;
//             break;
//           case 'gender':
//             state.gender = value;
//             break;
//           case 'phoneNumber':
//             state.phoneNumber = value;
//             break;
//           case 'password':
//             state.password = value;
//             break;
//           case 'confirmPassword':
//             state.confirmPassword = value;
//             break;
//           case 'termsAndConditions':
//             state.termsAndConditions = value;
//             break;
//           default:
            
//             break;
//         }
//       },
//       prepare: (field: keyof FormValues, value: any) => ({ payload: { field, value } }),
//     },
//     resetForm: () => initialState,
//   },
// });

// export const { updateField, resetForm } = formSlice.actions;

// export const selectFormData = (state: RootState) => state.form;
// // it will extract data from the store's state

// export default formSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; 

export interface FormValues {
 formData:any
}


const initialState: FormValues = {
  
  formData:{}

};



const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    
    setFormData(state, { payload }) {
      state.formData = payload;
    },
    resetForm() {
      return initialState;
    },
  },
});
const { actions } = formSlice;

export const formSliceActions = actions;

export default formSlice.reducer;