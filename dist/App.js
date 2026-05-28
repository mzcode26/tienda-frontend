"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_query_1 = require("@tanstack/react-query");
var sonner_1 = require("sonner");
var index_1 = require("./router/index");
var queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 30000,
        },
    },
});
function App() {
    return (<react_query_1.QueryClientProvider client={queryClient}>
      <index_1.default />
      <sonner_1.Toaster position="top-right" richColors/>
    </react_query_1.QueryClientProvider>);
}
exports.default = App;
