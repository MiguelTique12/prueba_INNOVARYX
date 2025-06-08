import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Presupuestos from './pages/Presupuestos';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>h

                    {/* Ruta raíz - redirige a welcome */}
                    <Route path="/" element={<Navigate to="/welcome" replace />} />

                    {/* Página de bienvenida */}
                    <Route path="/welcome" element={<Welcome />} />

                    {/* Página de gestión de presupuestos */}
                    <Route path="/presupuestos" element={<Presupuestos />} />

                    {/* Ruta 404 - redirige a welcome */}
                    <Route path="*" element={<Navigate to="/welcome" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;