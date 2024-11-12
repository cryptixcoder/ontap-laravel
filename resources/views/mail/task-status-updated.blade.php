<x-mail::message>

Hi {{ $organization->name }},

Good news! The task &ldquo;{{$task->name}}&rdquo; has changed status from <strong>{{$oldStatus}}</strong> to <strong>{{$newStatus}}</strong>.

You can view the updated task details here:

<x-mail::button :url="$url">
View Task
</x-mail::button>

Best, <br/>
The Syncware Technologies OnTap Team

</x-mail::message>
