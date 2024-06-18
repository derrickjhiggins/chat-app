import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
    userInput: string = '';
    messages: { sender: 'user' | 'chatbot', text: string }[] = [];
    isTyping: boolean = false;
  
    constructor(private chatService: ChatService) {}

    sendExampleQuestion(exampleQuestion: string): void {
        this.appendMessage('user', exampleQuestion);
        const messagePayload = { message: exampleQuestion };
    
        // Send the question to the chatbot service
        this.chatService.sendMessage(messagePayload).subscribe({
            next: data => {
              this.appendMessage('chatbot', data.response);
              console.log('Chatbot response:', data.response); // Debugging output
            },
            error: error => {
              console.error('Error fetching chatbot response:', error);
              // Handle the error (e.g., display an error message to the user)
            },
            complete: () => {
              this.isTyping = false;
            }
          });
      }
    
    sendMessage() {
      const userInput = this.userInput.trim();
      if (!userInput) return;
      console.log(userInput);
  
      this.appendMessage('user', userInput);
      this.userInput = '';
      const messagePayload = { message: userInput };
      console.log(messagePayload);
  
      this.isTyping = true;
  
      this.chatService.sendMessage(messagePayload).subscribe({
        next: data => {
          this.appendMessage('chatbot', data.response);
          console.log('Chatbot response:', data.response); // Debugging output
        },
        error: error => {
          console.error('Error fetching chatbot response:', error);
          // Handle the error (e.g., display an error message to the user)
        },
        complete: () => {
          this.isTyping = false;
        }
      });
      
    }

    onTextareaInput(event: Event): void {
        const textarea = event.target as HTMLTextAreaElement;
        textarea.style.height = 'auto'; // Reset textarea height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set textarea height based on content
    }

    appendMessage(sender: 'user' | 'chatbot', text: string) {
        this.messages.push({ sender, text });
    }
}
