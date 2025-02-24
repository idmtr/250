/**
 * CURSOR RULES
 *
 * 1. Font Configuration
 * - Inter and Geist fonts must be configured at the root layout
 * - Font variables must be consistent across layouts
 * - Class names must match between server and client
 *
 * 2. Layout Structure
 * - Root layout must include both font variables
 * - Language-specific layout must extend root font configuration
 * - Admin layout must be separate from language layouts
 *
 * 3. Styling Constants
 * - Primary colors: #D4A373, #F5EBE0
 * - Text colors: #1F1F1F
 * - Font weights: font-light for navigation and headers
 *
 * 4. Navigation
 * - Language menu uses 🌐 icon
 * - Consistent hover states
 * - Dropdown animations
 *
 * 5. Admin Routes
 * - Must bypass language middleware
 * - Separate layout structure
 * - Authentication handling
 *
 * 6. Hydration Rules
 * - No window checks in initial render
 * - Consistent class names between server/client
 * - Avoid dynamic class generation
 *
 * 7. Class Name Consistency
 * - Use consistent class ordering
 * - Maintain font classes across layouts
 * - Keep styling hierarchy
 */

// Font configuration
export const fontConfig = {
  className: "font-sans antialiased",
  variables: "inter.variable geist.variable",
};

// Color scheme
export const colors = {
  primary: "#D4A373",
  secondary: "#F5EBE0",
  text: "#1F1F1F",
  background: "bg-gray-50",
};

// Layout classes
export const layoutClasses = {
  root: "min-h-screen font-sans antialiased",
  admin: "min-h-screen bg-gray-50",
  main: "min-h-screen",
};

// Navigation classes
export const navClasses = {
  link: "hover:text-[#D4A373] transition-colors duration-300",
  dropdown: "absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg",
};
