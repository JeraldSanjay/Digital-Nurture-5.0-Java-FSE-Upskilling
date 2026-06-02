-- ============================================================
--  MODULE 2 — ANSI SQL Using MySQL
--  Community Event Portal — All 25 Exercises
-- ============================================================
--
--  Schema Tables Used:
--    Users, Events, Sessions, Registrations, Feedback, Resources
-- ============================================================


-- ============================================================
-- 1. User Upcoming Events
--    Show all upcoming events a user is registered for
--    in their city, sorted by start date.
-- ============================================================
SELECT
    u.full_name,
    u.city,
    e.title          AS event_title,
    e.start_date,
    e.end_date,
    e.status
FROM Users u
JOIN Registrations r ON u.user_id = r.user_id
JOIN Events        e ON r.event_id = e.event_id
WHERE e.status = 'upcoming'
  AND e.city   = u.city
ORDER BY e.start_date ASC;


-- ============================================================
-- 2. Top Rated Events
--    Events with the highest average rating (min 10 feedbacks).
-- ============================================================
SELECT
    e.event_id,
    e.title,
    ROUND(AVG(f.rating), 2) AS avg_rating,
    COUNT(f.feedback_id)    AS total_feedback
FROM Events   e
JOIN Feedback f ON e.event_id = f.event_id
GROUP BY e.event_id, e.title
HAVING COUNT(f.feedback_id) >= 10
ORDER BY avg_rating DESC;


-- ============================================================
-- 3. Inactive Users
--    Users who have NOT registered for any event in the
--    last 90 days.
-- ============================================================
SELECT
    u.user_id,
    u.full_name,
    u.email,
    u.city
FROM Users u
WHERE u.user_id NOT IN (
    SELECT DISTINCT r.user_id
    FROM Registrations r
    WHERE r.registration_date >= CURDATE() - INTERVAL 90 DAY
);


-- ============================================================
-- 4. Peak Session Hours
--    Count sessions scheduled between 10 AM and 12 PM
--    for each event.
-- ============================================================
SELECT
    e.event_id,
    e.title,
    COUNT(s.session_id) AS sessions_10am_to_12pm
FROM Events   e
JOIN Sessions s ON e.event_id = s.event_id
WHERE TIME(s.start_time) >= '10:00:00'
  AND TIME(s.start_time) <  '12:00:00'
GROUP BY e.event_id, e.title
ORDER BY sessions_10am_to_12pm DESC;


-- ============================================================
-- 5. Most Active Cities
--    Top 5 cities with the highest number of distinct
--    user registrations.
-- ============================================================
SELECT
    u.city,
    COUNT(DISTINCT r.user_id) AS total_registered_users
FROM Users         u
JOIN Registrations r ON u.user_id = r.user_id
GROUP BY u.city
ORDER BY total_registered_users DESC
LIMIT 5;


-- ============================================================
-- 6. Event Resource Summary
--    Number of resources (PDFs, images, links) per event.
-- ============================================================
SELECT
    e.event_id,
    e.title,
    COUNT(CASE WHEN res.resource_type = 'pdf'   THEN 1 END) AS pdfs,
    COUNT(CASE WHEN res.resource_type = 'image' THEN 1 END) AS images,
    COUNT(CASE WHEN res.resource_type = 'link'  THEN 1 END) AS links,
    COUNT(res.resource_id)                                   AS total_resources
FROM Events     e
LEFT JOIN Resources res ON e.event_id = res.event_id
GROUP BY e.event_id, e.title
ORDER BY total_resources DESC;


-- ============================================================
-- 7. Low Feedback Alerts
--    Users who gave a rating less than 3, with their
--    comments and associated event names.
-- ============================================================
SELECT
    u.full_name,
    u.email,
    e.title   AS event_title,
    f.rating,
    f.comments,
    f.feedback_date
FROM Feedback f
JOIN Users  u ON f.user_id  = u.user_id
JOIN Events e ON f.event_id = e.event_id
WHERE f.rating < 3
ORDER BY f.rating ASC;


-- ============================================================
-- 8. Sessions per Upcoming Event
--    Upcoming events with a count of their scheduled sessions.
-- ============================================================
SELECT
    e.event_id,
    e.title,
    e.city,
    e.start_date,
    COUNT(s.session_id) AS session_count
FROM Events   e
LEFT JOIN Sessions s ON e.event_id = s.event_id
WHERE e.status = 'upcoming'
GROUP BY e.event_id, e.title, e.city, e.start_date
ORDER BY e.start_date ASC;


-- ============================================================
-- 9. Organizer Event Summary
--    For each organizer: number of events and their statuses.
-- ============================================================
SELECT
    u.user_id,
    u.full_name                                               AS organizer_name,
    COUNT(e.event_id)                                         AS total_events,
    COUNT(CASE WHEN e.status = 'upcoming'   THEN 1 END)      AS upcoming,
    COUNT(CASE WHEN e.status = 'completed'  THEN 1 END)      AS completed,
    COUNT(CASE WHEN e.status = 'cancelled'  THEN 1 END)      AS cancelled
FROM Users  u
JOIN Events e ON u.user_id = e.organizer_id
GROUP BY u.user_id, u.full_name
ORDER BY total_events DESC;


-- ============================================================
-- 10. Feedback Gap
--     Events that had registrations but received NO feedback.
-- ============================================================
SELECT
    e.event_id,
    e.title,
    COUNT(r.registration_id) AS total_registrations
FROM Events        e
JOIN Registrations r ON e.event_id = r.event_id
WHERE e.event_id NOT IN (
    SELECT DISTINCT event_id FROM Feedback
)
GROUP BY e.event_id, e.title
ORDER BY total_registrations DESC;


-- ============================================================
-- 11. Daily New User Count
--     Number of users who registered each day in the
--     last 7 days.
-- ============================================================
SELECT
    registration_date,
    COUNT(user_id) AS new_users
FROM Users
WHERE registration_date >= CURDATE() - INTERVAL 7 DAY
GROUP BY registration_date
ORDER BY registration_date ASC;


-- ============================================================
-- 12. Event with Maximum Sessions
--     Event(s) having the highest number of sessions.
-- ============================================================
SELECT
    e.event_id,
    e.title,
    COUNT(s.session_id) AS session_count
FROM Events   e
JOIN Sessions s ON e.event_id = s.event_id
GROUP BY e.event_id, e.title
HAVING COUNT(s.session_id) = (
    SELECT MAX(session_count)
    FROM (
        SELECT COUNT(session_id) AS session_count
        FROM Sessions
        GROUP BY event_id
    ) AS counts
)
ORDER BY e.event_id;


-- ============================================================
-- 13. Average Rating per City
--     Average feedback rating of events held in each city.
-- ============================================================
SELECT
    e.city,
    ROUND(AVG(f.rating), 2) AS avg_rating,
    COUNT(f.feedback_id)    AS total_feedback
FROM Events   e
JOIN Feedback f ON e.event_id = f.event_id
GROUP BY e.city
ORDER BY avg_rating DESC;


-- ============================================================
-- 14. Most Registered Events
--     Top 3 events by total number of user registrations.
-- ============================================================
SELECT
    e.event_id,
    e.title,
    COUNT(r.registration_id) AS total_registrations
FROM Events        e
JOIN Registrations r ON e.event_id = r.event_id
GROUP BY e.event_id, e.title
ORDER BY total_registrations DESC
LIMIT 3;


-- ============================================================
-- 15. Event Session Time Conflict
--     Sessions within the same event whose times overlap.
-- ============================================================
SELECT
    a.event_id,
    a.session_id       AS session_a_id,
    a.title            AS session_a,
    b.session_id       AS session_b_id,
    b.title            AS session_b,
    a.start_time       AS a_start,
    a.end_time         AS a_end,
    b.start_time       AS b_start,
    b.end_time         AS b_end
FROM Sessions a
JOIN Sessions b
    ON  a.event_id   = b.event_id
    AND a.session_id < b.session_id
    AND a.start_time < b.end_time
    AND a.end_time   > b.start_time
ORDER BY a.event_id, a.session_id;


-- ============================================================
-- 16. Unregistered Active Users
--     Users who created an account in the last 30 days
--     but haven't registered for any event.
-- ============================================================
SELECT
    u.user_id,
    u.full_name,
    u.email,
    u.registration_date
FROM Users u
WHERE u.registration_date >= CURDATE() - INTERVAL 30 DAY
  AND u.user_id NOT IN (
      SELECT DISTINCT user_id FROM Registrations
  )
ORDER BY u.registration_date DESC;


-- ============================================================
-- 17. Multi-Session Speakers
--     Speakers handling more than one session across
--     all events.
-- ============================================================
SELECT
    speaker_name,
    COUNT(session_id) AS total_sessions
FROM Sessions
GROUP BY speaker_name
HAVING COUNT(session_id) > 1
ORDER BY total_sessions DESC;


-- ============================================================
-- 18. Resource Availability Check
--     Events that have NO resources uploaded.
-- ============================================================
SELECT
    e.event_id,
    e.title,
    e.city,
    e.status
FROM Events e
WHERE e.event_id NOT IN (
    SELECT DISTINCT event_id FROM Resources
)
ORDER BY e.event_id;


-- ============================================================
-- 19. Completed Events with Feedback Summary
--     For each completed event: total registrations and
--     average feedback rating.
-- ============================================================
SELECT
    e.event_id,
    e.title,
    COUNT(DISTINCT r.registration_id)  AS total_registrations,
    ROUND(AVG(f.rating), 2)            AS avg_rating,
    COUNT(DISTINCT f.feedback_id)      AS total_feedback
FROM Events        e
LEFT JOIN Registrations r ON e.event_id = r.event_id
LEFT JOIN Feedback      f ON e.event_id = f.event_id
WHERE e.status = 'completed'
GROUP BY e.event_id, e.title
ORDER BY avg_rating DESC;


-- ============================================================
-- 20. User Engagement Index
--     For each user: events attended and feedbacks submitted.
-- ============================================================
SELECT
    u.user_id,
    u.full_name,
    COUNT(DISTINCT r.event_id)    AS events_registered,
    COUNT(DISTINCT f.feedback_id) AS feedbacks_submitted
FROM Users         u
LEFT JOIN Registrations r ON u.user_id = r.user_id
LEFT JOIN Feedback      f ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name
ORDER BY events_registered DESC, feedbacks_submitted DESC;


-- ============================================================
-- 21. Top Feedback Providers
--     Top 5 users who have submitted the most feedback.
-- ============================================================
SELECT
    u.user_id,
    u.full_name,
    u.email,
    COUNT(f.feedback_id) AS total_feedbacks
FROM Users    u
JOIN Feedback f ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name, u.email
ORDER BY total_feedbacks DESC
LIMIT 5;


-- ============================================================
-- 22. Duplicate Registrations Check
--     Detect if a user has been registered more than
--     once for the same event.
-- ============================================================
SELECT
    user_id,
    event_id,
    COUNT(registration_id) AS registration_count
FROM Registrations
GROUP BY user_id, event_id
HAVING COUNT(registration_id) > 1
ORDER BY registration_count DESC;


-- ============================================================
-- 23. Registration Trends
--     Month-wise registration count over the past 12 months.
-- ============================================================
SELECT
    DATE_FORMAT(registration_date, '%Y-%m') AS month,
    COUNT(registration_id)                  AS total_registrations
FROM Registrations
WHERE registration_date >= CURDATE() - INTERVAL 12 MONTH
GROUP BY DATE_FORMAT(registration_date, '%Y-%m')
ORDER BY month ASC;


-- ============================================================
-- 24. Average Session Duration per Event
--     Average duration (in minutes) of sessions per event.
-- ============================================================
SELECT
    e.event_id,
    e.title,
    ROUND(
        AVG(TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time))
    , 2) AS avg_duration_minutes
FROM Events   e
JOIN Sessions s ON e.event_id = s.event_id
GROUP BY e.event_id, e.title
ORDER BY avg_duration_minutes DESC;


-- ============================================================
-- 25. Events Without Sessions
--     All events that currently have no sessions scheduled.
-- ============================================================
SELECT
    e.event_id,
    e.title,
    e.city,
    e.status,
    e.start_date
FROM Events e
WHERE e.event_id NOT IN (
    SELECT DISTINCT event_id FROM Sessions
)
ORDER BY e.start_date ASC;


-- ============================================================
--  End of Module 2 SQL Exercises
-- ============================================================
