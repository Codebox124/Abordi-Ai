export type RootStackParamList = {
  PromptToolsScreen: {
    tools: {
      name: string;
      description: string;
      url: string;
    }[];
  };
    Home: undefined;
    PromptTools: {
      promptTitle: string;
      tools: any[];
    };
  };
  