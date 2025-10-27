function LoginPage({ onLogin, switchToRegister }) {
  const [formData, setFormData] = useState({
    stationCode: '',
    stationMasterId: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.stationCode || !formData.stationMasterId || !formData.password) {
      alert('Please fill all fields!');
      return;
    }
    onLogin(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Header />
        
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back!
          </h2>

          <div className="space-y-4">
            <InputField
              label="Station Code"
              name="stationCode"
              value={formData.stationCode}
              onChange={handleInputChange}
              placeholder="Enter station code"
              IconComponent={MapPin}
            />

            <InputField
              label="Station Master ID"
              name="stationMasterId"
              value={formData.stationMasterId}
              onChange={handleInputChange}
              placeholder="Enter station master ID"
              IconComponent={User}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              IconComponent={Lock}
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg"
            >
              LOGIN
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={switchToRegister}
              className="text-blue-700 hover:text-blue-900 text-sm font-medium"
            >
              Don't have an account? Register here
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}