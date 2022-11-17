type Message = {
  id: number;
  text: string;

  // Optional fields
  author?: string;
  timestamp?: number;

  // Optional fields with default values
  isRead?: boolean;
  isDeleted?: boolean;

  // Optional fields with default values and type assertions
  isStarred?: boolean;
  isArchived?: boolean;
};

type Contact = {
  id: number;
  name: string;
  email: string;
};
