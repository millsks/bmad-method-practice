import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Typography, Box } from '@mui/material';
/**
 * Root component for HabitFlow application
 */
function App() {
    return (_jsx(Container, { maxWidth: "md", children: _jsxs(Box, { sx: { py: 4 }, children: [_jsx(Typography, { variant: "h1", component: "h1", gutterBottom: true, children: "HabitFlow" }), _jsx(Typography, { variant: "subtitle1", color: "textSecondary", children: "Recovery-first habit tracking for better continuity" })] }) }));
}
export default App;
//# sourceMappingURL=App.js.map