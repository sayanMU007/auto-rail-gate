function RegisterPage({ onRegister, switchToLogin }) {
  const stations = [
    { name: 'New Delhi Railway Station', code: 'NDLS' },
    { name: 'Mumbai Central', code: 'MMCT' },
    { name: 'Howrah Junction', code: 'HWH' },
    { name: 'Chennai Central', code: 'MAS' },
    { name: 'Bengaluru City Junction', code: 'SBC' },
    { name: 'Pune Junction', code: 'PUNE' },
    { name: 'Secunderabad Junction', code: 'SC' },
    { name: 'Kanpur Central', code: 'CNB' },
    { name: 'Nagpur Junction', code: 'NGP' },
    { name: 'Jaipur Junction', code: 'JP' },
    { name: 'Ahmedabad Junction', code: 'ADI' },
    { name: 'Lucknow Charbagh', code: 'LKO' },
    { name: 'Patna Junction', code: 'PNBE' },
    { name: 'Vijayawada Junction', code: 'BZA' },
    { name: 'Bhopal Junction', code: 'BPL' }
  ];

  const [formData, setFormData] = useState({
    stationCode: '',
    stationMasterId: '',
    password: '',
    confirmPassword: '',
    stationName: '',
    gateNumber: ''
  });
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredStations, setFilteredStations] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'stationName') {
      setFormData({ ...formData, stationName: value });
      
      if (value.trim() === '') {
        setFilteredStations([]);
        setShowSuggestions(false);
      } else {
        const filtered = stations.filter(station =>
          station.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredStations(filtered);
        setShowSuggestions(true);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const selectStation = (station) => {
    setFormData({
      ...formData,
      stationName: station.name,
      stationCode: station.code
    });
    setShowSuggestions(false);
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!formData.stationName || !formData.gateNumber || !formData.stationCode || !formData.stationMasterId || !formData.password) {
      alert('Please fill all fields!');
      return;
    }
    onRegister(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Header />
        
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Station Master Registration
          </h2>

          <div className="space-y-4">
            <StationSearchField
              formData={formData}
              handleInputChange={handleInputChange}
              showSuggestions={showSuggestions}
              filteredStations={filteredStations}
              selectStation={selectStation}
              setShowSuggestions={setShowSuggestions}
            />

            <InputField
              label="Gate Number"
              name="gateNumber"
              value={formData.gateNumber}
              onChange={handleInputChange}
              placeholder="Enter gate number"
              IconComponent={Shield}
            />

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

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm password"
              IconComponent={Lock}
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg"
            >
              REGISTER
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={switchToLogin}
              className="text-blue-700 hover:text-blue-900 text-sm font-medium"
            >
              Already have an account? Login here
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}