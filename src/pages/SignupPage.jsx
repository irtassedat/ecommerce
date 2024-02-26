import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles } from '../store/actions/globalAction';
import axiosInstance from '../mock/axiosInstance';

export default function SignUpForm() {
  const dispatch = useDispatch();
  const roles = useSelector(state => state.global.roles); // Redux store'dan roles dizisini çekiyoruz
  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role_id: "",
      store: { name: "", phone: "", tax_no: "", bank_account: "" },
    },
    mode: "onChange",
  });
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    // Rol listesi store'da yoksa fetch işlemi yap
    if (!roles || roles.length === 0) {
        dispatch(fetchRoles());
    }
}, [dispatch, roles]);
const onSubmit = async (data) => {
  // Confirm password alanını backend kabul etmiyor.
  delete data.confirmPassword;

  setLoading(true);
  try {
    const response = await axiosInstance.post("/signup", data);
    alert('Tebrikler! Kullanıcı başarıyla oluşturuldu. Aktivasyon mailinizi kontrol edin.');
    setLoading(false);

    window.location.href = '/login'; //anasayfaya yönlendirme
  } catch (error) {
    console.error('SignUp işlemi başarısız:', error.response?.data.message || error.message);
    alert('SignUp işlemi başarılı olmadı, hata: ' + (error.response?.data.message || error.message));
    setLoading(false);
  }
};

  const isStoreSelected = watch("role_id") === "2";

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="form-group">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input id="name" type="text" {...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must have at least 3 characters." }})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input id="email" type="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" }})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input id="password" type="password" {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must have at least 8 characters." }})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input id="confirmPassword" type="password" {...register("confirmPassword", { validate: value => value === watch('password') || "Passwords do not match" })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="role-select" className="block text-sm font-medium text-gray-700">Role</label>
          <select id="role-select" {...register("role_id", { required: "Role selection is required" })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
          {errors.role_id && <p className="text-sm text-red-600">{errors.role_id.message}</p>}
        </div>

        {isStoreSelected && (
          <>
            <div className="form-group">
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">Store Name</label>
              <input id="storeName" type="text" {...register("store.name", { required: isStoreSelected, minLength: { value: 3, message: "Store name must have at least 3 characters." }})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.store?.name && <p className="text-sm text-red-600">{errors.store.name.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="storePhone" className="block text-sm font-medium text-gray-700">Store Phone</label>
              <input id="storePhone" type="text" {...register("store.phone", { required: isStoreSelected, pattern: { value: /^(\+90|0)?5\d{9}$/, message: "Must be a valid Turkish phone number." }})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.store?.phone && <p className="text-sm text-red-600">{errors.store.phone.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="storeTaxID" className="block text-sm font-medium text-gray-700">Store Tax ID</label>
              <input id="storeTaxID" type="text" {...register("store.tax_no", { required: isStoreSelected, pattern: { value: /^T\d{4}V\d{6}$/, message: "Must match the pattern TXXXXVXXXXXX." }})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.store?.tax_no && <p className="text-sm text-red-600">{errors.store.tax_no.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="storeBankAccount" className="block text-sm font-medium text-gray-700">Store Bank Account</label>
              <input id="storeBankAccount" type="text" {...register("store.bank_account", { required: isStoreSelected, pattern: { value: /^TR\d{2}[a-zA-Z0-9]{16}$/, message: "Must be a valid IBAN address." }})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.store?.bank_account && <p className="text-sm text-red-600">{errors.store.bank_account.message}</p>}
            </div>
          </>
        )}
        
        <div className="flex justify-center items-center">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 relative">
            {loading && <div className="absolute inset-0 flex justify-center items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>}
            {loading ? 'Processing...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
}
