type Message = {
  id: string;
  text: string;
  from: string;

  // Optional fields
  timestamp?: number;

  // Optional fields with default values
  isDeleted?: boolean;

  // Optional fields with default values and type assertions
  isStarred?: boolean;
  isArchived?: boolean;
};

type Contact = {
  id: number;
  name: string;
  email: string;
  hasUnreadMessages: boolean;
};
