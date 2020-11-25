import React from 'react'
import { TextField, FormControlLabel, Checkbox, Button, Grid } from '@material-ui/core'

export default function UserDetails() {
  return (
    <form>
      <TextField required fullWidth autoFocus variant="outlined" label="예매자" placeholder="이름" margin="normal" />
      <TextField required fullWidth variant="outlined" label="연락처" placeholder="010-1234-5678" margin="normal" />
      <TextField fullWidth variant="outlined" label="이메일" placeholder="example@naver.com" margin="normal" />
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox value="allowExtraEmails" color="primary" />}
          label="이용자 약관에 동의합니다"
        />
      </Grid>
      <Button type="submit" variant="contained" color="primary">
        결제하기
      </Button>
    </form>
  )
}
