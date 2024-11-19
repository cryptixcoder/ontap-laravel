<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Slack\BlockKit\Blocks\ContextBlock;
use Illuminate\Notifications\Slack\BlockKit\Blocks\SectionBlock;
use Illuminate\Notifications\Slack\SlackMessage;

class SubscriptionStatusChanged extends Notification
{
    use Queueable;

    public $data;

    /**
     * Create a new notification instance.
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['slack'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }

    public function toSlack(object $notifiable): SlackMessage
    {
        return (new SlackMessage)
                    ->text("A user has made an update to their subscription.")
                    ->headerBlock("Subscription Updated!")
                    ->contextBlock(function(ContextBlock $block) {
                        $block->text($this->data['organization']);
                    })
                    ->sectionBlock(function(SectionBlock $block) {
                        $block->text("{$this->data['organization']}'s subscription has been changed to {$this->data['status']}.");
                        $block->field("*Organization*: {$this->data['organization']}");
                        $block->field("*Email*: {$this->data['customer_email']}");
                        $block->field("*Plan*: {$this->data['plan']}");
                        $block->field("*Status*: {$this->data['status']}");
                        $block->field("*Plan*: {$this->data['plan']}");
                    });
    }
}
