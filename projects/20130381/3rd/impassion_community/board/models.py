from django.db import models
# Create your models here.

class Board(models.Model):
    title=models.CharField(max_length=128,
                            verbose_name='제목')
    contents=models.TextField(verbose_name='내용')
    writer=models.ForeignKey('impassionuser.Impassionuser', on_delete=models.CASCADE,
                            verbose_name='작성자')
    registered_dttm=models.DateTimeField(auto_now_add=True,
                                        verbose_name='등록시간') 

    def __str__(self):
        return self.title

    class Meta:
        db_table='impassion_board'
        verbose_name='임패션 게시글'
        verbose_name_plural='임패션 게시글'
                       