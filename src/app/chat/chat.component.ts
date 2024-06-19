import { Component } from '@angular/core';
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
    messages: { sender: string, text: string[] }[] = [];
  
    constructor(private chatService: ChatService) {}
    
    sendMessage(exampleQuestion?: string): void {
        // get user input query
        const userInput = exampleQuestion ? exampleQuestion.trim() : this.userInput.trim();
        if (!userInput) return;

        this.appendMessage('user', [userInput]);
        this.userInput = '';
        const messagePayload = { message: userInput };

        this.chatService.sendMessage(messagePayload).subscribe({
            next: data => {
                let res: string[] = [];
                for (let i = 0; i < data.length; i ++ ) {
                    let urls: string = "<i>Sources:<i><br>"
                    if (data[i].urls && data[i].urls.length > 0) {
                        // URLs exist, construct the links
                        urls += data[i].urls.map((url: string) => `<a href="${url}" target="_blank">${url}</a><br>`).join('');
                    } else {
                        urls = "<i>Sources not available.<i>";
                    }                                 
                    const message: string = `${data[i].agentName}:<br>${data[i].agentResponse}<br><br>${urls}`;
                    res.push(message);
                }
                this.appendMessage('chatbot', res)
            },
            error: error => {
                console.error('Error fetching chatbot response:', error);
            },
      });
    }

    onTextareaInput(event: Event): void {
        const textarea = event.target as HTMLTextAreaElement;
        textarea.style.height = 'auto'; // Reset textarea height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set textarea height based on content
    }

    appendMessage(sender: string, text: string[]) {
        this.messages.push({ sender, text });
    }
}
