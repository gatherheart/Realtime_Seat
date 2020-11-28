import React, { useState } from 'react'
import { TextField, FormControlLabel, Checkbox, Button, Grid } from '@material-ui/core'

export default function UserDetails() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    contact: '',
  })
  const [agreement, setAgreement] = useState(false)

  const handleChange = (inputType: string) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValues({ ...values, [inputType]: e.target.value })
  }

  return (
    <form>
      <TextField
        required
        fullWidth
        autoFocus
        variant="outlined"
        label="예매자"
        placeholder="이름"
        margin="normal"
        onChange={handleChange('name')}
      />
      <TextField
        required
        fullWidth
        variant="outlined"
        label="연락처"
        placeholder="010-1234-5678"
        margin="normal"
        onChange={handleChange('contact')}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="이메일"
        placeholder="example@naver.com"
        margin="normal"
        onChange={handleChange('email')}
      />
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color="primary" onChange={(e) => setAgreement(e.target.checked)} />}
          label="이용자 약관에 동의합니다"
        />
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!agreement || values.name === '' || values.contact === ''}
      >
        결제하기
      </Button>
    </form>
  )
}
