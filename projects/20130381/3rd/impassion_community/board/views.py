from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.http import Http404
from impassionuser.models import Impassionuser
from .models import Board
from .forms import BoardForm
# Create your views here.

def board_detail(request, pk):
    try:
        board = Board.objects.get(pk=pk)
    except Board.DoesNotExist:
        raise Http404('게시글을 찾을 수 없습니다')

    return render(request, 'board_detail.html', {'board': board})

def board_write(request):
    if not request.session.get('user'):
        return redirect('/login/')

    if request.method=='POST':
        form = BoardForm(request.POST)
        if form.is_valid():
            user_id = request.session.get('user')
            impassionuser = Impassionuser.objects.get(pk=user_id)
            
            board = Board()
            board.title = form.cleaned_data['title']
            board.contents = form.cleaned_data['contents']
            board.writer = impassionuser
            board.save()

            return redirect('/regular_session/list/')

    else:
        form = BoardForm()

    return render(request, 'board_write.html', {'form': form})


def board_list(request):
    all_boards = Board.objects.all().order_by('-id')
    page = int(request.GET.get('p', 1))
    paginator= Paginator(all_boards, 3)

    boards = paginator.get_page(page)

    return render(request, 'board_list.html', {'boards': boards})

    