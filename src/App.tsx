import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<div>Welcome to VietShop!</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;