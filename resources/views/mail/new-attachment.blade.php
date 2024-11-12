<x-mail::message>
Hi {{ $organization->name }},

An attachment has been added to your task &ldquo;{{ $task->name }}&rdquo;.

You can view and download the attachment here:

<x-mail::button :url="$url">
View Attachments
</x-mail::button>


Make sure to review it so you can stay on track!

Best, <br/>
The Syncware Technologies OnTap Team
</x-mail::message>
