<x-mail::message>
Hi {{ $organization->name }},

A new comment has been added to the task &ldquo;{{$task->name}}&rdquo; by {{ $comment->user->name}}. Here’s what they said:

&ldquo;{{$comment->comment}}&rdquo;

Feel free to respond or check out the task directly here:

<x-mail::button :url="$url">
View Discussion
</x-mail::button>

Best, <br/>
The Syncware Technologies OnTap Team
</x-mail::message>
