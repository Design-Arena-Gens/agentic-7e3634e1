import TodoList from '../components/TodoList';

export default function Page() {
  return (
    <main className="container">
      <header className="hero">
        <h1>Agentic App</h1>
        <p>Fast Next.js starter deployed on Vercel.</p>
      </header>

      <section>
        <h2>Your Tasks</h2>
        <TodoList />
      </section>

      <footer className="footer">
        <p>Built with Next.js and deployed to Vercel.</p>
      </footer>
    </main>
  );
}
