import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';

afterEach(() => {
  localStorage.clear();
  vi.unstubAllGlobals();
});

describe('App', () => {
  it('renders the login screen when the user is not authenticated', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /login to knowledge base/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email or username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('validates required login fields before submission', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Email or username and password are required.',
    );
  });

  it('logs in and shows the authenticated shell', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            token: 'valid-token',
            user: {
              id: 'admin-001',
              email: 'admin@knowledgebase.local',
              username: 'admin',
              role: 'Admin',
              department: 'Management',
              position: 'Manager',
            },
          },
        }),
      }),
    );

    render(<App />);

    fireEvent.change(screen.getByLabelText(/email or username/i), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Admin@123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /knowledge base/i })).toBeInTheDocument();
    });
    expect(screen.getByText(/signed in as admin/i)).toBeInTheDocument();
  });
});
