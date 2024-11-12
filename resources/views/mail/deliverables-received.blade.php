<x-mail::message>
Hi {{$organization->name}},

Your project &ldquo;{{ $project->title }}&rdquo; has just received new deliverables! You can review them and check the progress here:

<x-mail::button :url="$url">
Review Deliverables
</x-mail::button>

We’re excited to see your project moving forward!

Thanks,<br>
The Syncware Technologies OnTap Team
</x-mail::message>
