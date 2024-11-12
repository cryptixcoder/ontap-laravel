<x-mail::message>
Hello,

<strong>{{$invitedBy->name}}</strong> has invited you to the <strong>{{ $organization->name }}</strong> team on{" "} <strong>On-Tap</strong>.

<x-mail::button :url="$link">
Join the team
</x-mail::button>

or copy and paste this URL into your browser:{" "} [{{$link}}]({{$link}})

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
