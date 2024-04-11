const academicYears = [2023, 2024, 2025, 2026]

export default academicYears

export const reversedAcademicYears = academicYears.map((_, idx) => academicYears[academicYears.length - 1 - idx])
