import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotesProvider } from './contexts/NotesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CreateNote } from './pages/CreateNote';
import { ViewNote } from './pages/ViewNote';
import { EditNote } from './pages/EditNote';

function App() {
  return (
    <ThemeProvider>
      <NotesProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateNote />} />
              <Route path="/note/:id" element={<ViewNote />} />
              <Route path="/note/:id/edit" element={<EditNote />} />
            </Routes>
          </Layout>
        </Router>
      </NotesProvider>
    </ThemeProvider>
  );
}

export default App;