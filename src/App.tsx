import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { ProjectDetail } from './pages/ProjectDetail/ProjectDetail';
import { Projects } from './pages/Projects/Projects';
import { StudentProfile } from './pages/StudentProfile/StudentProfile';
import { Students } from './pages/Students/Students';
import { Year } from './pages/Year/Year';
import { Years } from './pages/Years/Years';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />
          <Route path="students" element={<Students />} />
          <Route path="students/:studentId" element={<StudentProfile />} />
          <Route path="years" element={<Years />} />
          <Route path="years/:year" element={<Year />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
