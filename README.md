# DnD CSV Graph Builder

A super quick proof of concept for building interactive graphs through drag-and-drop interactions with CSV data.
Built in a weekend to test my rapid prototyping capabilities and learn some new things.

## 🚀 Features

- **Intuitive Drag & Drop Interface**: Seamlessly map CSV columns to graph components
- **Smart Column Type Detection**: Automatic inference of data types (string, number, date, boolean)
- **Interactive Graph Building**: Real-time visualization updates as you configure your data
- **Multiple Graph Types**: Support for:
  - Pie Charts: Perfect for showing proportions and percentages
  - Bar Charts: Ideal for comparing categories
- **Responsive Design**: Modern, clean interface that works across devices
- **Type-Safe**: Built with TypeScript for robust development

## 🛠️ Technical Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Combination of Jotai and Zustand for simple and efficient state handling
- **Drag & Drop**: DND Kit for smooth drag and drop interactions
- **Styling**: Emotion for styled components + TailwindCSS for utility classes
- **Visualization**: Visx (by Airbnb) for powerful, flexible graphs
- **Build Tool**: Vite for lightning-fast development experience
- **CSV Parsing**: Papa Parse for reliable CSV data handling

## 🏃‍♂️ Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🎯 How It Works

1. **Upload CSV**: Start by uploading your CSV file
2. **Configure Columns**: Review and adjust automatically detected column types
3. **Choose Graph**: Select your desired visualization type
4. **Map Data**: Drag and drop columns to configure your graph
5. **Done!**: Your interactive visualization is ready to use

## TODO

- [ ] Make Bar chart work
- [ ] Add Bubble Chart
- [ ] Add functionality for mapping many fields to 1 config
- [ ] Add Graph series
- [ ] Add data transformation capabilities
- [ ] Add export functionality
- [ ] Add more graph types
- [ ] Improve UX
- [ ] Improve UI

## 📝 License

GNU GPLv3 - feel free to use this code as inspiration for your own projects!
