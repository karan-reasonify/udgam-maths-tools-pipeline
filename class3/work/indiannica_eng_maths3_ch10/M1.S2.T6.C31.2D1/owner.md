# Calendar Explorer: the owner's description (2026-10-28). Read with brief.md and ../NOTES.md "Owner decisions".

Develop an interactive calendar tool that helps students explore days, weeks, months and years, understand the number of days in different months, identify leap years and find dates using a calendar.

Display a clear wall calendar with seven columns for the days of the week, starting with Sunday, and a grid of dates in their correct positions. Include month cards, a four-year strip, two hands for demonstrating the knuckle method, page-flipping controls and a simple grid-view option.

Divide the activity into four stages.

Stage 1: Understanding Days, Weeks and Months. Students explore a calendar by selecting rows and counting seven days in a week. They flip through the twelve months of a year and observe that a year contains 52 complete weeks and one additional day in a common year. Use the calendar to demonstrate that months have different numbers of days.

Stage 2: Finding the Number of Days in a Month. Display two hands or fists to demonstrate the knuckle method. Students move through the months in order and identify which months have 31 days and which have 30 days. Show February separately because it has 28 days in a common year and 29 days in a leap year.

Stage 3: Understanding Leap Years. Display a four-year strip and let students select each year to explore the number of days in that year. Use the chapter's every-fourth-year pattern to introduce leap years. Show February gaining an extra day in a leap year and explain that the year has 366 days instead of 365.

Stage 4: Finding Dates and Counting Weeks. Students select a date on the calendar, identify its day of the week and move forward seven days at a time to find later dates. Include activities that ask students to find a date, count the days or weeks between two dates, and determine which weekday a particular date falls on. Ensure that the counting method does not accidentally count the starting date twice.

Give immediate visual feedback after each answer. If a student counts the days in a month incorrectly, highlight the month's calendar and show the correct number of days. If a student miscounts weeks, demonstrate the seven-day jumps on the calendar. Allow students to retry.

Visual and Interaction Requirements: Use a realistic, recognisable wall-calendar design in the chapter's clean picture-book style. Keep the date grid spacious, with readable numbers and clearly labelled weekdays. Month arrows should flip the calendar correctly, and every month must display the correct number of days and weekday positions for its year.

Include a free-exploration mode where students can browse months and years without answering a question. Use simple instructions, clear feedback and new practice dates. The tool should help students discover calendar patterns by interacting with the calendar instead of memorising facts alone.

## Decisions on top of this (see ../NOTES.md)
**The two fists are a REAL PHOTO of a closed fist, not SVG (the owner, 2026-10-28; NOTES.md decision 13):** a `fist` skin from images.json drawn over the code-drawn fists (kept as the fallback), the second hand the same photo mirrored; knuckle and dip marks drawn in code at the coordinates in images.json. Four stages = the four phases of brief.md. Every calendar is computed for its real year; the weekday of a date and the days between two dates are computed, never typed in. "Count the days between" never counts the start date twice (say in the tool which end is counted).
