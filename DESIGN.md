# HealthyBag — Design Document

> A research-backed meal planning web app that builds personalized weekly meal plans
> from discounted groceries on [eBag.bg](https://www.ebag.bg), Bulgaria's leading online supermarket.

---

## Table of Contents

1. [Vision & Value Proposition](#1-vision--value-proposition)
2. [Target Users](#2-target-users)
3. [Core Features](#3-core-features)
4. [Delight & Engagement Features](#4-delight--engagement-features)
5. [Nutrition Science Engine](#5-nutrition-science-engine)
6. [eBag.bg Integration](#6-ebagbg-integration)
7. [Information Architecture](#7-information-architecture)
8. [Tech Stack](#8-tech-stack)
9. [Data Model](#9-data-model)
10. [System Architecture](#10-system-architecture)
11. [Key User Flows](#11-key-user-flows)
12. [UI/UX Concept](#12-uiux-concept)
13. [Monetization](#13-monetization)
14. [Roadmap](#14-roadmap)

---

## 1. Vision & Value Proposition

**Problem:** Eating healthy in Bulgaria is perceived as expensive and time-consuming.
People don't know how to combine proper nutrition with budget shopping, and they waste
time browsing through hundreds of discounted items with no nutritional context.

**Solution:** HealthyBag turns eBag.bg's weekly discounts into science-backed,
personalized meal plans — so users eat better, save money, and never wonder
"what's for dinner?" again.

**Core Promise:**
- "Eat healthy for less" — every plan maximizes discounted ingredients
- Research-backed nutrition — not fad diets, but TDEE/macro science
- Zero friction — from plan to filled eBag.bg cart in one click

---

## 2. Target Users

| Persona | Description | Key Need |
|---------|-------------|----------|
| **Budget-Conscious Healthy Eater** | 25-40, wants to eat well but watches spending | Save money without sacrificing nutrition |
| **Fitness Enthusiast** | Tracks macros, has specific body composition goals | Precise macro-aligned plans from real grocery items |
| **Busy Professional** | Limited time for meal prep and planning | Automated weekly plans + ready shopping list |
| **Family Meal Planner** | Plans meals for 2-5 people, needs variety | Scalable portions, kid-friendly options, budget control |
| **Health-Condition Manager** | Diabetes, hypertension, cholesterol management | Medically-aware meal restrictions |

---

## 3. Core Features

### 3.1 Onboarding Profile

Users complete a guided profile that captures:

- **Body metrics:** age, sex, height, weight, body fat % (optional)
- **Goal:** lose fat, gain muscle, maintain weight, general wellness
- **Activity level:** sedentary, lightly active, moderately active, very active, athlete
- **Dietary preferences:** omnivore, vegetarian, vegan, pescatarian
- **Allergies & exclusions:** gluten, lactose, nuts, shellfish, specific ingredients
- **Cooking skill level:** beginner, intermediate, advanced
- **Time budget:** quick meals (<20 min), moderate (20-45 min), elaborate (45+ min)
- **Meals per day:** 2-6 (with preferred meal spacing)
- **Household size:** number of people eating
- **Weekly food budget:** target in BGN

### 3.2 Smart Meal Plan Generator

The engine produces a complete meal plan for a selected period (1 day to 4 weeks):

- **Discount-first ingredient selection** — scans current eBag.bg promotions and
  builds plans around discounted items to maximize savings
- **Macro-balanced daily plans** — each day hits the user's calculated calorie and
  macronutrient targets (protein, carbs, fat)
- **Variety algorithm** — avoids repeating the same protein/grain/vegetable within
  a configurable window (e.g., no same main dish within 4 days)
- **Seasonal awareness** — prefers in-season produce for better taste and price
- **Leftover intelligence** — if Monday's recipe uses half a cabbage, Tuesday's plan
  will use the other half, minimizing food waste
- **Prep-day optimization** — optionally groups batch-cookable items on weekends

### 3.3 Recipe Engine

Each meal in the plan links to a full recipe:

- **Step-by-step cooking instructions** with estimated time per step
- **Ingredient quantities** scaled to household size
- **Nutritional breakdown** per serving (calories, protein, carbs, fat, fiber, sodium)
- **Difficulty rating** and total prep/cook time
- **Photo/illustration** for the finished dish
- **Substitution suggestions** — if an ingredient is unavailable, what to swap
- **Video tips** (future) — short clips for tricky techniques

### 3.4 Smart Shopping List

Automatically generated from the meal plan:

- **Grouped by eBag.bg category** (produce, dairy, meat, pantry, etc.)
- **Highlights discounted items** with savings amount shown
- **Combines quantities** across recipes (e.g., 3 recipes need onions → 1 line: "Onions, 1.5 kg")
- **One-click add to eBag.bg cart** — deep-links or integrates to add all items at once
- **Pantry check** — lets users mark items they already have to skip them
- **Total cost estimate** with discount savings breakdown

### 3.5 Nutrition Dashboard

A personal health tracking view:

- **Daily/weekly macro tracking** — visual bars for protein, carbs, fat
- **Calorie trend graph** — planned vs. target over time
- **Micronutrient coverage** — vitamins and minerals heatmap (are you getting enough iron, B12, etc.?)
- **Hydration reminder** integration
- **Progress toward goal** — weight trend line (if user logs weight)

---

## 4. Delight & Engagement Features

These features aim to make users **anticipate opening the app** and be **pleasantly
surprised** each time they do.

### 4.1 "Chef's Surprise" — Daily Discovery

Each day, the app presents one unexpected element:

- **Discovery Dish** — a recipe the user has never tried, matched to their palate
  profile but slightly outside their comfort zone ("You love chicken — have you
  tried chicken shawarma bowls?")
- **Fun Food Fact** — a bite-sized nutrition or culinary fact ("Did you know that
  bell peppers have more vitamin C than oranges?")
- **Secret Discount Alert** — notifies when a rarely-discounted premium ingredient
  appears on eBag.bg that matches the user's preferences

### 4.2 Gamification: "Healthy Streaks & Badges"

- **Cooking Streak** — track consecutive days/weeks of following the meal plan;
  unlock streak badges (7-day, 30-day, 90-day)
- **Budget Hero** — badge for staying under budget while hitting macro targets
- **Variety Explorer** — badge for trying 10/25/50 new recipes
- **Discount Hunter** — badge for building a full weekly plan with 80%+ discounted items
- **Zero Waste Champion** — badge for weeks with no leftover food waste
- **Seasonal Eater** — badge for using primarily in-season ingredients
- **Skill level progression** — start as "Kitchen Rookie," progress to "Home Chef,"
  "Gourmet Master" as you cook more complex recipes

### 4.3 "What's in My Fridge?" Rescue Mode

- User inputs (or photographs) leftover ingredients in their fridge
- App generates rescue recipes from those ingredients + minimal eBag.bg additions
- Reduces waste, feels like magic

### 4.4 Weekly "Meal Plan Reveal"

- Every Sunday evening (configurable), the new week's plan is "revealed" with
  an engaging animation — like unwrapping a gift
- Highlights: total savings this week, new recipes to try, a "star dish" of the week
- Push notification: "Your new week of healthy eating is ready! You'll save 47 лв this week"

### 4.5 Social & Community

- **Meal Plan Sharing** — share your weekly plan as a beautiful card on social media
  or with friends in-app
- **Family/Household Sync** — multiple household members see the same plan, can
  vote on dishes, leave recipe ratings
- **Community Recipes** — users submit their own recipes; top-voted ones get
  featured in generated plans
- **Cooking Challenges** — weekly community challenges ("This week: best dish
  under 5 лв", "Meatless Monday challenge")
- **Leaderboards** — most money saved, longest streak, most recipes tried

### 4.6 Smart Notifications That Don't Annoy

- **Prep Reminder** — "Tomorrow's lunch needs overnight marinating — start tonight!"
- **Flash Discount Alert** — "Salmon is 40% off today only — want to swap it into
  this week's plan?"
- **Achievement Unlocked** — "You've cooked 25 new recipes! 🏆"
- **Weekly Report** — "This week you saved 32 лв and hit your protein target 6/7 days"
- All notifications are configurable and respect quiet hours

### 4.7 Seasonal & Holiday Specials

- **Holiday Meal Plans** — Christmas, Easter, New Year, Baba Marta, name days —
  with traditional Bulgarian dishes adapted to the user's nutritional goals
- **Seasonal Transitions** — when seasonal produce changes, the app proactively
  refreshes plans ("Summer tomatoes are here — your plans just got an upgrade!")
- **Birthday Treat** — on the user's birthday, suggest a special "cheat meal" recipe
  that still stays somewhat on target

### 4.8 AI Taste Profile & Flavor Matching

- Track which recipes users rate highly and which they skip
- Build a "taste DNA" profile: spice tolerance, texture preferences, cuisine
  affinities (Mediterranean, Asian, Bulgarian traditional, etc.)
- Use this to improve recommendations over time — the app gets smarter the more
  you use it

### 4.9 Cooking Mode

- **Hands-free step-by-step** — large text, swipe/voice to advance steps
- **Built-in timers** — tap to start a timer for "simmer 15 minutes"
- **Ingredient checklist** — check off ingredients as you go
- **"I messed up" button** — quick tips for common mistakes (over-salted? add
  potato. Sauce too thin? add cornstarch slurry.)

### 4.10 "Healthy Swap" Nudges

- When the user adds a non-plan item to their eBag.bg cart, suggest a healthier
  alternative: "Instead of white bread, try this whole grain option — same price,
  3x the fiber"
- Gentle, never preachy — always framed as savings + health benefit

---

## 5. Nutrition Science Engine

All calculations are research-backed and transparent to the user.

### 5.1 TDEE Calculation

Primary formula: **Mifflin-St Jeor** (most validated for general population):

```
Men:   BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) + 5
Women: BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) - 161
```

If body fat % is provided, use **Katch-McArdle** for greater accuracy:

```
BMR = 370 + (21.6 × lean_body_mass_kg)
where lean_body_mass_kg = weight_kg × (1 - body_fat_percentage / 100)
```

Activity multipliers (PAL factors):

| Level | Multiplier | Description |
|-------|-----------|-------------|
| Sedentary | 1.2 | Desk job, little exercise |
| Lightly Active | 1.375 | Light exercise 1-3 days/week |
| Moderately Active | 1.55 | Moderate exercise 3-5 days/week |
| Very Active | 1.725 | Hard exercise 6-7 days/week |
| Athlete | 1.9 | Professional/competitive athlete |

```
TDEE = BMR × Activity_Multiplier
```

### 5.2 Goal Adjustments

| Goal | Calorie Adjustment |
|------|-------------------|
| Lose fat (moderate) | TDEE × 0.80 (20% deficit) |
| Lose fat (aggressive) | TDEE × 0.75 (25% deficit, only if BF% > 25%) |
| Maintain | TDEE × 1.00 |
| Lean gain | TDEE + 200 kcal |
| Muscle gain | TDEE + 300-500 kcal |

### 5.3 Macronutrient Distribution

**Protein** (sliding scale based on goal and body composition):

| Goal | Protein (g per kg of body weight) |
|------|----------------------------------|
| Fat loss | 1.6 - 2.2 g/kg |
| Maintain | 1.2 - 1.6 g/kg |
| Muscle gain | 1.8 - 2.4 g/kg |

**Fat:** 25-35% of total calories (minimum 0.8 g/kg for hormonal health)

**Carbohydrates:** remaining calories after protein and fat are set

### 5.4 Micronutrient Awareness

The engine tracks key micronutrients across the day's meals and flags deficiencies:

- Iron, Calcium, Vitamin D, B12, Zinc, Magnesium, Omega-3
- Fiber (target: 25-35g/day)
- Sodium (warning if > 2300mg/day)

### 5.5 Special Condition Adjustments

Optional medical-condition modifiers (with disclaimer to consult doctor):

- **Diabetes/pre-diabetes:** lower glycemic load, distribute carbs evenly
- **Hypertension:** sodium cap at 1500mg/day, emphasize potassium-rich foods (DASH diet principles)
- **High cholesterol:** limit saturated fat to < 7% of calories
- **Pregnancy/nursing:** adjusted calorie surplus, folate emphasis, avoid unsafe foods

---

## 6. eBag.bg Integration

### 6.1 Data Collection Strategy

Since eBag.bg has no public API, a multi-layer approach is needed:

**Layer 1: Web Scraping Service** (primary)
- Scheduled scraper runs every 4-6 hours to capture:
  - All product listings: name, category, price, unit, weight/volume
  - Promotional/discounted items: original price, sale price, discount %, promo end date
  - Product images and descriptions
  - Nutritional information (when available on product pages)
- Scraping targets:
  - `ebag.bg/en/promo-products` — current promotions
  - `ebag.bg/en/categories/*` — full product catalog
  - Individual product pages — detailed nutrition data

**Layer 2: Nutritional Data Enrichment**
- Many eBag.bg products won't have full nutritional data
- Cross-reference with:
  - USDA FoodData Central API (free, comprehensive)
  - Open Food Facts API (community-driven, good European coverage)
  - Manual nutritional database for common Bulgarian products
- Fuzzy matching algorithm maps eBag.bg product names → nutritional database entries

**Layer 3: Affiliate / Partnership** (future)
- Approach eBag.bg for official partnership/affiliate program
- Would unlock: official product feed, cart API integration, revenue share
- Value proposition to eBag.bg: drives sales of discounted items, increases basket size

### 6.2 Product Categorization

Map eBag.bg categories to nutritional categories:

```
eBag Category          → HealthyBag Category
──────────────────────────────────────────────
Fruits                 → Produce / Fruits
Vegetables             → Produce / Vegetables
Meat & Chicken         → Protein / Meat
Fish & Seafood         → Protein / Seafood
Eggs                   → Protein / Eggs
Dairy                  → Dairy
Bread & Bakery         → Grains / Bread
Rice, Pasta, Legumes   → Grains / Staples
Frozen Foods           → (mapped by subcategory)
Oils & Condiments      → Fats & Oils
Nuts & Seeds           → Healthy Fats / Snacks
Baby Food              → (excluded from plans unless specified)
```

### 6.3 Cart Integration

Until an official API is available:

- **Deep-link approach:** generate URLs that open eBag.bg with products pre-searched
- **Browser extension** (optional): automatically adds items from HealthyBag
  shopping list to eBag.bg cart
- **Copy-to-clipboard:** formatted shopping list for manual eBag.bg ordering

---

## 7. Information Architecture

```
HealthyBag App
├── Home (Dashboard)
│   ├── Today's Meals (quick view of today's plan)
│   ├── Chef's Surprise (daily discovery)
│   ├── Savings Summary
│   └── Quick Actions (generate plan, view list, cooking mode)
│
├── Profile & Goals
│   ├── Body Metrics
│   ├── Dietary Preferences
│   ├── Goal Settings
│   ├── Cooking Preferences
│   └── Household Members
│
├── Meal Plans
│   ├── Current Week Plan
│   ├── Plan History
│   ├── Meal Calendar (month view)
│   ├── Swap a Meal (regenerate single meal)
│   └── Plan Reveal (weekly animation)
│
├── Recipes
│   ├── Recipe Browser (search, filter, favorites)
│   ├── Recipe Detail / Cooking Mode
│   ├── Community Recipes
│   └── My Recipes (user-submitted)
│
├── Shopping
│   ├── Smart Shopping List
│   ├── Current eBag.bg Deals
│   ├── Pantry Manager
│   ├── Budget Tracker
│   └── Order via eBag.bg
│
├── Fridge Rescue
│   ├── Input Ingredients
│   ├── Photo Scan (future: AI image recognition)
│   └── Rescue Recipes
│
├── Progress
│   ├── Nutrition Dashboard
│   ├── Weight/Body Tracking
│   ├── Achievements & Badges
│   ├── Cooking Streak
│   └── Weekly Reports
│
├── Community
│   ├── Cooking Challenges
│   ├── Leaderboards
│   ├── Shared Plans
│   └── Recipe Reviews
│
└── Settings
    ├── Notification Preferences
    ├── Language (BG / EN)
    ├── Theme
    └── Data & Privacy
```

---

## 8. Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router) — SSR for SEO, RSC for performance
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui component library
- **State Management:** Zustand (lightweight, minimal boilerplate)
- **Charts/Visualizations:** Recharts (for nutrition dashboards)
- **Animations:** Framer Motion (plan reveals, transitions, micro-interactions)
- **PWA:** next-pwa for installable mobile experience with offline support

### Backend
- **Runtime:** Node.js with Next.js API Routes + Server Actions
- **Database:** PostgreSQL (via Supabase — includes auth, storage, realtime)
- **ORM:** Prisma
- **Job Queue:** BullMQ + Redis (for scraping jobs, plan generation)
- **Caching:** Redis (product data, generated plans)

### Data & ML
- **Scraping:** Playwright (headless browser for JavaScript-rendered eBag.bg pages)
- **Nutritional APIs:** USDA FoodData Central, Open Food Facts
- **Meal Plan Algorithm:** Custom constraint-satisfaction solver (see §5)
- **Taste Profile:** Collaborative filtering (recipe ratings → similar user recommendations)

### Infrastructure
- **Hosting:** Vercel (frontend) + Railway or Fly.io (backend workers)
- **Database:** Supabase (managed Postgres + Auth + Storage)
- **File Storage:** Supabase Storage (recipe images, user uploads)
- **Monitoring:** Sentry (errors), Vercel Analytics (performance)
- **CI/CD:** GitHub Actions

---

## 9. Data Model

### Core Entities

```
┌──────────────┐    ┌──────────────────┐    ┌──────────────────┐
│    User       │    │   UserProfile     │    │  UserPreference   │
├──────────────┤    ├──────────────────┤    ├──────────────────┤
│ id           │───→│ userId           │───→│ userId            │
│ email        │    │ age              │    │ dietType          │
│ name         │    │ sex              │    │ allergies[]       │
│ avatarUrl    │    │ heightCm         │    │ excludedFoods[]   │
│ createdAt    │    │ weightKg         │    │ cookingSkill      │
│ locale       │    │ bodyFatPct       │    │ maxPrepTimeMin    │
└──────────────┘    │ activityLevel    │    │ mealsPerDay       │
                    │ goal             │    │ cuisineAffinities │
                    │ tdee (computed)  │    │ spiceTolerance    │
                    │ targetCalories   │    │ householdSize     │
                    │ targetProtein    │    │ weeklyBudgetBgn   │
                    │ targetCarbs      │    └──────────────────┘
                    │ targetFat        │
                    └──────────────────┘

┌──────────────────┐    ┌──────────────────┐
│   EbagProduct     │    │  EbagPromotion    │
├──────────────────┤    ├──────────────────┤
│ id               │───→│ productId         │
│ ebagId           │    │ originalPrice     │
│ name             │    │ salePrice         │
│ nameBg           │    │ discountPct       │
│ category         │    │ promoStartDate    │
│ subcategory      │    │ promoEndDate      │
│ price            │    │ scrapedAt         │
│ unit             │    └──────────────────┘
│ weightGrams      │
│ imageUrl         │    ┌──────────────────┐
│ ebagUrl          │    │  NutritionData    │
│ inStock          │    ├──────────────────┤
│ lastScrapedAt    │───→│ productId         │
└──────────────────┘    │ caloriesPer100g   │
                        │ proteinPer100g    │
                        │ carbsPer100g      │
                        │ fatPer100g        │
                        │ fiberPer100g      │
                        │ sodiumPer100g     │
                        │ source (usda/off) │
                        │ confidence        │
                        └──────────────────┘

┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│     Recipe        │    │ RecipeIngredient  │    │   RecipeStep      │
├──────────────────┤    ├──────────────────┤    ├──────────────────┤
│ id               │───→│ recipeId          │    │ recipeId          │
│ title            │    │ productId (nullable)   │ stepNumber        │
│ titleBg          │    │ ingredientName    │    │ instruction       │
│ description      │    │ quantityGrams     │    │ instructionBg     │
│ cuisine          │    │ unit              │    │ durationMinutes   │
│ mealType         │    │ isOptional        │    │ timerSeconds      │
│ difficulty       │    │ substitutionGroup │    │ imageUrl          │
│ prepTimeMin      │    └──────────────────┘    └──────────────────┘
│ cookTimeMin      │
│ servings         │
│ totalCalories    │
│ totalProtein     │
│ totalCarbs       │
│ totalFat         │
│ imageUrl         │
│ isUserSubmitted  │
│ authorId         │
│ rating           │
│ ratingCount      │
└──────────────────┘

┌──────────────────┐    ┌──────────────────┐
│    MealPlan       │    │   MealPlanEntry   │
├──────────────────┤    ├──────────────────┤
│ id               │───→│ mealPlanId        │
│ userId           │    │ date              │
│ startDate        │    │ mealSlot (breakfast│
│ endDate          │    │   /lunch/dinner/   │
│ totalCost        │    │   snack)          │
│ totalSavings     │    │ recipeId          │
│ avgDailyCalories │    │ servings          │
│ status           │    │ isCompleted       │
│ generatedAt      │    │ userRating        │
└──────────────────┘    └──────────────────┘

┌──────────────────┐    ┌──────────────────┐
│  ShoppingList     │    │ ShoppingListItem  │
├──────────────────┤    ├──────────────────┤
│ id               │───→│ listId            │
│ mealPlanId       │    │ productId         │
│ userId           │    │ ingredientName    │
│ totalCost        │    │ quantity          │
│ totalSavings     │    │ unit              │
│ createdAt        │    │ estimatedPrice    │
│                  │    │ isOnPromotion     │
│                  │    │ isInPantry        │
│                  │    │ isChecked         │
└──────────────────┘    └──────────────────┘

┌──────────────────┐    ┌──────────────────┐
│  Achievement      │    │  UserAchievement  │
├──────────────────┤    ├──────────────────┤
│ id               │    │ userId            │
│ slug             │───→│ achievementId     │
│ name             │    │ unlockedAt        │
│ description      │    │ progress          │
│ iconUrl          │    └──────────────────┘
│ category         │
│ threshold        │
└──────────────────┘
```

---

## 10. System Architecture

```
                         ┌─────────────────────┐
                         │    User's Browser    │
                         │   (Next.js PWA)      │
                         └─────────┬───────────┘
                                   │
                         ┌─────────▼───────────┐
                         │   Vercel Edge        │
                         │   (Next.js SSR/RSC)  │
                         └─────────┬───────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
           ┌────────▼──────┐ ┌────▼─────┐ ┌─────▼────────┐
           │  API Routes   │ │  Server  │ │   Static     │
           │  (REST/tRPC)  │ │  Actions │ │   Assets     │
           └────────┬──────┘ └────┬─────┘ └──────────────┘
                    │              │
                    └──────┬───────┘
                           │
              ┌────────────▼────────────┐
              │       Supabase          │
              │  ┌───────┐ ┌────────┐  │
              │  │ Postgres│ │  Auth  │  │
              │  └───────┘ └────────┘  │
              │  ┌───────┐ ┌────────┐  │
              │  │Storage │ │Realtime│  │
              │  └───────┘ └────────┘  │
              └─────────────────────────┘
                           │
              ┌────────────▼────────────┐
              │    Background Workers    │
              │    (Railway/Fly.io)      │
              │  ┌──────────────────┐   │
              │  │  eBag Scraper    │   │
              │  │  (Playwright)    │   │
              │  └──────────────────┘   │
              │  ┌──────────────────┐   │
              │  │  Nutrition       │   │
              │  │  Enrichment      │   │
              │  └──────────────────┘   │
              │  ┌──────────────────┐   │
              │  │  Meal Plan       │   │
              │  │  Generator       │   │
              │  └──────────────────┘   │
              └────────┬────────────────┘
                       │
              ┌────────▼────────┐
              │     Redis       │
              │  (Cache + Queue)│
              └─────────────────┘

External APIs:
  ├── USDA FoodData Central (nutrition data)
  ├── Open Food Facts (European product data)
  └── eBag.bg (web scraping target)
```

---

## 11. Key User Flows

### Flow 1: First-Time User → Generated Plan

```
1. Landing page → "Start Eating Healthy for Less" CTA
2. Sign up (email or social auth via Supabase)
3. Guided onboarding wizard (5 screens):
   a. Body metrics (height, weight, age, sex)
   b. Goal selection (visual cards: lose fat / gain muscle / maintain / wellness)
   c. Activity level (illustrated slider)
   d. Dietary preferences & allergies (multi-select chips)
   e. Cooking preferences (skill, time, meals/day, household size, budget)
4. Loading screen with progress: "Analyzing 1,247 discounted items..."
5. Plan Reveal animation → week view with daily meals
6. User can tap any meal to see recipe, swap it, or favorite it
7. "Create Shopping List" → see combined list with savings highlighted
8. "Order on eBag.bg" → deep-link to eBag.bg with items
```

### Flow 2: Returning User — Weekly Cycle

```
Sunday evening:
  1. Push notification: "Your new meal plan is ready!"
  2. Open app → Plan Reveal animation
  3. Review plan, swap any meals they don't like
  4. Confirm plan → shopping list generated

Monday–Sunday:
  1. Open app → Today's view shows meals for the day
  2. Tap a meal → enter Cooking Mode
  3. After cooking, rate the recipe (1-5 stars)
  4. Mark meal as completed → streak updates

  Throughout the week:
  - Flash discount alerts for relevant items
  - Chef's Surprise daily discovery
  - Badge/achievement notifications
```

### Flow 3: Fridge Rescue

```
1. Tap "Fridge Rescue" from home screen
2. Type or photograph ingredients on hand
3. App matches to known ingredients and eBag.bg products
4. Shows 3-5 recipe suggestions ranked by:
   - How many ingredients are already available
   - How few additional items to buy
   - Match to user's taste profile
5. Select recipe → Cooking Mode
```

---

## 12. UI/UX Concept

### Design Principles

1. **Fresh & Appetizing** — warm color palette (greens, oranges, cream), generous
   food photography, organic shapes
2. **Simple by Default, Powerful on Demand** — home screen is clean; details
   are revealed progressively
3. **Savings Always Visible** — every screen subtly reinforces how much money
   the user is saving
4. **Bulgarian-First** — default language is Bulgarian, but fully bilingual (BG/EN)
5. **Mobile-First, Desktop-Friendly** — PWA that works beautifully on phones;
   desktop layout for meal planning/shopping

### Color Palette

```
Primary:     #2D6A4F (forest green — health, freshness)
Secondary:   #F77F00 (warm orange — energy, appetite)
Accent:      #FCBF49 (golden yellow — highlights, savings badges)
Background:  #FEFAE0 (warm cream — natural, inviting)
Surface:     #FFFFFF
Text:        #1B1B1B
Text Muted:  #6B7280
Success:     #40916C
Warning:     #E76F51
Error:       #D62828
```

### Typography

- **Headings:** Plus Jakarta Sans (modern, friendly, great for Bulgarian Cyrillic)
- **Body:** Inter (clean, highly readable at all sizes)

### Key Screen Concepts

**Home Dashboard:**
```
┌─────────────────────────────────┐
│  👋 Здравей, Димитър!           │
│  Днес спестяваш 12.40 лв       │
├─────────────────────────────────┤
│  ┌─── Today's Meals ──────────┐│
│  │ 🌅 Breakfast: Oatmeal w/   ││
│  │    seasonal berries         ││
│  │ 🌤 Lunch: Grilled chicken  ││
│  │    shopska salad            ││
│  │ 🌙 Dinner: Lentil soup     ││
│  │    w/ wholegrain bread      ││
│  └────────────────────────────┘│
│  ┌─── Chef's Surprise ───────┐│
│  │ 🎁 Try tonight: Bulgarian  ││
│  │    moussaka — lighter ver. ││
│  │    only 420 kcal/serving!  ││
│  └────────────────────────────┘│
│  ┌─── Your Progress ──────────┐│
│  │ 🔥 12-day streak!          ││
│  │ P ████████░░ 82%           ││
│  │ C ██████░░░░ 64%           ││
│  │ F █████░░░░░ 55%           ││
│  └────────────────────────────┘│
├─────────────────────────────────┤
│  🏠  📅  🛒  🏆  ⚙️            │
│  Home Plan Shop Progress Settings│
└─────────────────────────────────┘
```

---

## 13. Monetization

### Freemium Model

**Free Tier:**
- 1 meal plan per week (3 meals/day)
- Basic recipe instructions
- Shopping list (without eBag.bg integration)
- Limited to 1-person household
- Basic nutrition dashboard

**Premium (HealthyBag Pro) — ~9.99 лв/month or 79.99 лв/year:**
- Unlimited meal plans (up to 4 weeks)
- Household support (up to 6 people)
- One-click eBag.bg cart integration
- Advanced nutrition dashboard with micronutrients
- Fridge Rescue mode
- Cooking Mode with timers
- All gamification features & badges
- Flash discount alerts
- Priority plan generation
- Ad-free experience

**Additional Revenue Streams:**
- **eBag.bg Affiliate Commission** — earn % on orders placed through deep-links
- **Promoted Products** — eBag.bg or brands pay for featured placement in plans
  (clearly labeled, never compromises nutritional integrity)
- **Recipe Sponsorship** — brands sponsor recipe features (e.g., "This recipe
  brought to you by Olympus Dairy")

---

## 14. Roadmap

### Phase 1 — MVP (Foundation)
- User auth and profile/onboarding
- eBag.bg scraper (products + promotions)
- Nutritional data enrichment pipeline
- Core meal plan generator (TDEE-based, discount-aware)
- Recipe database (50-100 curated Bulgarian-friendly recipes)
- Basic shopping list generation
- Responsive web UI (mobile-first)

### Phase 2 — Engagement
- Cooking Mode with step-by-step instructions
- Weekly Plan Reveal animation
- Achievement/badge system
- Recipe rating and taste profile tracking
- Smart notifications (prep reminders, flash deals)
- Pantry manager

### Phase 3 — Social & Intelligence
- Community recipe submissions
- Meal plan sharing (social cards)
- Household sync (family plans)
- Fridge Rescue mode
- AI taste profile and flavor matching
- Cooking challenges and leaderboards

### Phase 4 — Scale & Monetize
- eBag.bg official partnership / affiliate integration
- One-click cart integration (browser extension or API)
- Premium subscription tier
- Holiday and seasonal special plans
- Bulgarian language AI recipe generation
- Mobile app (React Native or Capacitor wrapper)

---

## Appendix A: Meal Plan Generation Algorithm

The meal plan generator is a **constraint-satisfaction problem** solved with a
weighted scoring approach:

```
For each meal_slot in plan_period:
  1. Filter recipes by:
     - Matches meal type (breakfast/lunch/dinner/snack)
     - All ingredients available on eBag.bg (or in pantry)
     - No excluded allergens or ingredients
     - Prep time within user's time budget
     - Difficulty within user's skill level

  2. Score each candidate recipe:
     score = w1 × discount_score      # % of ingredients on promotion
           + w2 × macro_fit_score     # how close to remaining daily macros
           + w3 × variety_score       # penalty for recently used ingredients
           + w4 × taste_match_score   # alignment with user taste profile
           + w5 × seasonal_score      # bonus for in-season ingredients
           + w6 × waste_score         # bonus for using leftover ingredients
           + w7 × budget_score        # how well it fits remaining weekly budget

  3. Select top-scoring recipe (with randomization factor to avoid monotony)

  4. Update remaining daily macros, weekly budget, and ingredient inventory

  5. If daily macro targets can't be met, backtrack and re-select previous meal
```

**Default weights:**
```
w1 (discount)  = 0.25   # savings are important
w2 (macros)    = 0.30   # nutritional accuracy is paramount
w3 (variety)   = 0.15   # avoid repetition
w4 (taste)     = 0.15   # user satisfaction
w5 (seasonal)  = 0.05   # nice to have
w6 (waste)     = 0.05   # reduce food waste
w7 (budget)    = 0.05   # stay within budget
```

## Appendix B: Bulgarian Food Culture Considerations

The recipe database and plan generator should account for Bulgarian eating patterns:

- **Breakfast:** lighter — yogurt (kiselo mlyako), cheese (sirene), bread, eggs, banitsa
- **Lunch:** traditionally the main meal — soups (bob chorba, shkembe), salads
  (shopska, snezhanka), grilled meats, stuffed peppers
- **Dinner:** lighter than lunch — salads, lighter soups, sandwiches
- **Snacks:** fruits, nuts, mekitsi, tutmanik
- **Staples:** yogurt, white cheese (sirene), yellow cheese (kashkaval), sunflower
  oil, peppers, tomatoes, cucumbers, potatoes, beans, lentils
- **Seasonal produce:** watermelon and tomatoes in summer, pumpkin and cabbage
  in winter, fresh herbs year-round

The app should include a strong base of traditional Bulgarian recipes adapted for
nutritional optimization while preserving authentic flavors.
