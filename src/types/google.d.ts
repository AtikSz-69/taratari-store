// Type declarations for Google Identity Services
interface GoogleAccountsId {
  initialize: (config: {
    client_id: string;
    callback: (response: { credential: string; select_by: string }) => void;
    auto_select?: boolean;
    context?: string;
  }) => void;
  renderButton: (
    element: HTMLElement,
    config: {
      type?: string;
      theme?: string;
      size?: string;
      text?: string;
      shape?: string;
      logo_alignment?: string;
      width?: number;
    }
  ) => void;
  prompt: () => void;
  disableAutoSelect: () => void;
}

interface Window {
  google?: {
    accounts: {
      id: GoogleAccountsId;
    };
  };
}
