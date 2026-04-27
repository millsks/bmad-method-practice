import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Alert, Box, Button, Card, CardContent, Grid, List, ListItem, ListItemText, MenuItem, Stack, TextField, Typography, } from '@mui/material';
import { createHabit, getDailyQueue } from './habitsApi';
const initialFormState = {
    name: '',
    cadence: 'daily',
    timeWindow: '',
    full: '',
    reduced: '',
    minimum: '',
};
function TieredHabitCreatePanel() {
    const [form, setForm] = useState(initialFormState);
    const [queue, setQueue] = useState(() => getDailyQueue());
    const [error, setError] = useState('');
    const hasQueueItems = useMemo(() => queue.length > 0, [queue.length]);
    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        try {
            createHabit({
                name: form.name,
                cadence: form.cadence,
                timeWindow: form.timeWindow,
                tiers: {
                    full: form.full,
                    reduced: form.reduced,
                    minimum: form.minimum,
                },
            });
            setQueue(getDailyQueue());
            setForm(initialFormState);
        }
        catch (submitError) {
            if (submitError instanceof Error) {
                setError(submitError.message);
            }
            else {
                setError('Unable to create habit');
            }
        }
    };
    return (_jsxs(Stack, { spacing: 3, children: [_jsx(Card, { component: "section", variant: "outlined", children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h2", component: "h2", gutterBottom: true, children: "Add Habit" }), _jsx(Typography, { variant: "body2", sx: { mb: 2 }, children: "Create a habit with full, reduced, and minimum targets." }), _jsx(Box, { component: "form", onSubmit: handleSubmit, noValidate: true, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, label: "Habit name", value: form.name, onChange: (event) => updateField('name', event.target.value) }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsxs(TextField, { select: true, fullWidth: true, label: "Cadence", value: form.cadence, onChange: (event) => updateField('cadence', event.target.value), children: [_jsx(MenuItem, { value: "daily", children: "Daily" }), _jsx(MenuItem, { value: "flexible", children: "Flexible" })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "Time window", value: form.timeWindow, onChange: (event) => updateField('timeWindow', event.target.value) }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(TextField, { fullWidth: true, label: "Full target", value: form.full, onChange: (event) => updateField('full', event.target.value) }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(TextField, { fullWidth: true, label: "Reduced target", value: form.reduced, onChange: (event) => updateField('reduced', event.target.value) }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(TextField, { fullWidth: true, label: "Minimum target", value: form.minimum, onChange: (event) => updateField('minimum', event.target.value) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Button, { type: "submit", variant: "contained", children: "Create habit" }) })] }) }), error ? (_jsx(Alert, { severity: "error", sx: { mt: 2 }, role: "alert", children: error })) : null] }) }), _jsx(Card, { component: "section", variant: "outlined", children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h2", component: "h2", gutterBottom: true, children: "Daily Queue" }), hasQueueItems ? (_jsx(List, { children: queue.map((habit) => (_jsx(ListItem, { divider: true, children: _jsx(ListItemText, { primary: habit.name, secondary: `Cadence: ${habit.cadence} · Window: ${habit.timeWindow} · Full: ${habit.tiers.full} · Reduced: ${habit.tiers.reduced} · Minimum: ${habit.tiers.minimum}` }) }, habit.id))) })) : (_jsx(Typography, { variant: "body2", children: "No habits in queue yet." }))] }) })] }));
}
export default TieredHabitCreatePanel;
//# sourceMappingURL=TieredHabitCreatePanel.js.map