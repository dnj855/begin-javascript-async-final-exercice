import "./style.css";
import { AddHabitDialog } from "./ui/AddHabitDialog";
import { HabitHistoryDialog } from "./ui/HabitHistoryDialog";
import { TodayHabits } from "./ui/TodayHabits";

const todayHabits = TodayHabits.getInstance();
const addHabitDialog = AddHabitDialog.getInstance();
const habitHistoryDialog = HabitHistoryDialog.getInstance();

todayHabits.init();
addHabitDialog.init();
habitHistoryDialog.init();
