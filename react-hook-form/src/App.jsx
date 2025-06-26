import Form from "./components/form";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-violet-700 text-white p-6 rounded-t-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center">
            Registro municipal de Volquetes
          </h1>
        </div>
        <div className="bg-white rounded-b-2xl shadow-lg p-6 border border-purple-200">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;