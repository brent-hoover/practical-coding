type GreetingResponse = {
  message: string;
};

export async function hello(name: string): Promise<string> {
  try {
    const response = await fetch('https://api.example.com/greet');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as GreetingResponse;
    return `Hello, ${name}! Server says: ${data.message}`;
  } catch (error) {
    // Fallback in case of network errors or API issues
    return `Hello, ${name}!`;
  }
}

// For a simpler example without external dependencies:
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
